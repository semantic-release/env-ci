import { temporaryDirectory } from "tempy";
import { spawn } from "node:child_process";
import fileUrl from "file-url";

function exec(bin, args = [], options = {}) {
  const child = spawn(bin, args, {
    ...options,
    encoding: "utf-8",
  });

  return new Promise((resolve, reject) => {
    const result = {
      stdout: "",
      stderr: "",
      exitCode: null,
    };

    child.stdout.on("data", (buffer) => {
      result.stdout += buffer;
    });
    child.stderr.on("data", (buffer) => {
      result.stderr += buffer;
    });
    child.on("exit", (code) => {
      result.exitCode = code;
    });
    child.on("close", (code) => {
      result.exitCode ??= code;
      result.stdout = result.stdout.slice(0, -1);
      result.stderr = result.stderr.slice(0, -1);
      resolve(result);
    });
    child.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Create a temporary git repository.
 * If `withRemote` is `true`, creates a bare repository, initialize it and create a shallow clone. Change the current working directory to the clone root.
 * If `withRemote` is `false`, creates a regular repository and initialize it. Change the current working directory to the repository root.
 *
 * @param {Boolean} withRemote `true` to create a shallow clone of a bare repository.
 * @param {String} [branch='master'] The branch to initialize.
 * @return {String} The path of the clone if `withRemote` is `true`, the path of the repository otherwise.
 */
export async function gitRepo(withRemote, branch = "master") {
  let cwd = temporaryDirectory();

  await exec("git", ["init", ...(withRemote ? ["--bare"] : [])], { cwd });

  const repositoryUrl = fileUrl(cwd);
  if (withRemote) {
    await initBareRepo(repositoryUrl, branch);
    cwd = await gitShallowClone(repositoryUrl);
  } else {
    await gitCheckout(branch, true, { cwd });
  }

  return { cwd, repositoryUrl };
}

/**
 * Initialize an existing bare repository:
 * - Clone the repository
 * - Change the current working directory to the clone root
 * - Create a default branch
 * - Create an initial commits
 * - Push to origin
 *
 * @param {String} origin The URL of the bare repository.
 * @param {String} [branch='master'] the branch to initialize.
 */
export async function initBareRepo(origin, branch = "master") {
  const cwd = temporaryDirectory();
  await exec("git", ["clone", "--no-hardlinks", origin, cwd], { cwd });
  await gitCheckout(branch, true, { cwd });
  await gitCommit("Initial commit", { cwd });
  await exec("git", ["push", origin, branch], { cwd });
}

/**
 * Create a shallow clone of a git repository and change the current working directory to the cloned repository root.
 * The shallow will contain a limited number of commit and no tags.
 *
 * @param {String} repositoryUrl The path of the repository to clone.
 * @param {String} [branch='master'] The branch to clone.
 * @param {Number} [depth=1] The number of commit to clone.
 *
 * @return {String} The path of the cloned repository.
 */
export async function gitShallowClone(
  repositoryUrl,
  branch = "master",
  depth = 1,
) {
  const cwd = temporaryDirectory();

  await exec(
    "git",
    [
      "clone",
      "--no-hardlinks",
      "--no-tags",
      "-b",
      branch,
      "--depth",
      String(depth),
      repositoryUrl,
      cwd,
    ],
    {
      cwd,
    },
  );
  return cwd;
}

/**
 * Checkout a branch on the current git repository.
 *
 * @param {String} branch Branch name.
 * @param {boolean} create to create the branche ans switch, `false` to only switch.
 * @param {Object} [options] Options to pass to `exec`.
 */
export async function gitCheckout(branch, create, options) {
  await exec(
    "git",
    create ? ["checkout", "-b", branch] : ["checkout", branch],
    options,
  );
}

/**
 * Create commit on the current git repository.
 *
 * @param {String} message commit message.
 * @param {Object} [options] Options to pass to `exec`.
 *
 * @returns {String} The created commit sha.
 */
export async function gitCommit(message, options) {
  await exec(
    "git",
    ["commit", "-m", message, "--allow-empty", "--no-gpg-sign"],
    options,
  );
  const { stdout } = await exec("git", ["rev-parse", "HEAD"], options);
  return stdout;
}

/**
 * @param {Object} [options] Options to pass to `exec`.
 *
 * @return {String} The sha of the head commit in the current git repository.
 */
export async function gitHead(options) {
  const { stdout } = await exec("git", ["rev-parse", "HEAD"], options);
  return stdout;
}
