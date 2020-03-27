const tempy = require('tempy');
const execa = require('execa');
const fileUrl = require('file-url');

/**
 * Create a temporary git repository.
 * If `withRemote` is `true`, creates a bare repository, initialize it and create a shallow clone. Change the current working directory to the clone root.
 * If `withRemote` is `false`, creates a regular repository and initialize it. Change the current working directory to the repository root.
 *
 * @param {Boolean} withRemote `true` to create a shallow clone of a bare repository.
 * @param {String} [branch='master'] The branch to initialize.
 * @return {String} The path of the clone if `withRemote` is `true`, the path of the repository otherwise.
 */
async function gitRepo(withRemote, branch = 'master') {
  let cwd = tempy.directory();

  await execa('git', ['init'].concat(withRemote ? ['--bare'] : []), {cwd});

  const repositoryUrl = fileUrl(cwd);
  if (withRemote) {
    await initBareRepo(repositoryUrl, branch);
    cwd = await gitShallowClone(repositoryUrl);
  } else {
    await gitCheckout(branch, true, {cwd});
  }

  return {cwd, repositoryUrl};
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
async function initBareRepo(origin, branch = 'master') {
  const cwd = tempy.directory();
  await execa('git', ['clone', '--no-hardlinks', origin, cwd], {cwd});
  await gitCheckout(branch, true, {cwd});
  await gitCommit('Initial commit', {cwd});
  await execa('git', ['push', origin, branch], {cwd});
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
async function gitShallowClone(repositoryUrl, branch = 'master', depth = 1) {
  const cwd = tempy.directory();

  await execa('git', ['clone', '--no-hardlinks', '--no-tags', '-b', branch, '--depth', depth, repositoryUrl, cwd], {
    cwd,
  });
  return cwd;
}

/**
 * Checkout a branch on the current git repository.
 *
 * @param {String} branch Branch name.
 * @param {boolean} create to create the branche ans switch, `false` to only switch.
 * @param {Object} [options] Options to pass to `execa`.
 */
async function gitCheckout(branch, create, options) {
  await execa('git', create ? ['checkout', '-b', branch] : ['checkout', branch], options);
}

/**
 * Create commit on the current git repository.
 *
 * @param {String} message commit message.
 * @param {Object} [options] Options to pass to `execa`.
 *
 * @returns {String} The created commit sha.
 */
async function gitCommit(message, options) {
  await execa('git', ['commit', '-m', message, '--allow-empty', '--no-gpg-sign'], options);
  return (await execa('git', ['rev-parse', 'HEAD'], options)).stdout;
}

/**
 * @param {Object} [options] Options to pass to `execa`.
 *
 * @return {String} The sha of the head commit in the current git repository.
 */
async function gitHead(options) {
  return (await execa('git', ['rev-parse', 'HEAD'], options)).stdout;
}

module.exports = {gitRepo, initBareRepo, gitShallowClone, gitCheckout, gitCommit, gitHead};
