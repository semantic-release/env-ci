// https://help.github.com/en/articles/virtual-environments-for-github-actions#environment-variables

const parseBranchOld = branch => (/refs\/heads\/(.*)/i.exec(branch) || [])[1];
const parseBranch = branch => (/^(?:\/refs\/heads\/)?([^/]+)$/i.exec(branch) || [])[1];

const getPrEvent = ({ env }) => {
  try {
    const event = env.GITHUB_EVENT_PATH ? require(env.GITHUB_EVENT_PATH) : undefined;

    if (event && event.pull_request) {
      console.log(parseBranchOld(event.pull_request.base.ref), parseBranch(event.pull_request.base.ref));
      return {
        branch: event.pull_request.base ? parseBranch(event.pull_request.base.ref) : undefined,
        pr: event.pull_request.number,
      };
    }
  } catch (_) {
    // Noop
  }

  return { pr: undefined, branch: undefined };
};

module.exports = {
  detect({ env }) {
    return Boolean(env.GITHUB_ACTION);
  },
  configuration({ env, cwd }) {
    const isPr = env.GITHUB_EVENT_NAME === "pull_request";
    console.log(parseBranchOld(env.GITHUB_REF), parseBranch(env.GITHUB_REF));
    const branch = parseBranch(env.GITHUB_REF);

    return {
      name: "GitHub Actions",
      service: "github",
      commit: env.GITHUB_SHA,
      isPr,
      branch,
      prBranch: isPr ? branch : undefined,
      slug: env.GITHUB_REPOSITORY,
      root: env.GITHUB_WORKSPACE,
      ...(isPr ? getPrEvent({ env, cwd }) : undefined),
    };
  },
};
