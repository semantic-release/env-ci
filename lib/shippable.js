// http://docs.shippable.com/ci/env-vars/#stdEnv

module.exports = {
  detect() {
    return Boolean(process.env.SHIPPABLE);
  },
  configuration() {
    return {
      service: 'shippable',
      commit: process.env.COMMIT,
      build: process.env.BUILD_NUMBER,
      branch: process.env.BASE_BRANCH || process.env.BRANCH,
      job: process.env.JOB_NUMBER,
      pr: process.env.PULL_REQUEST === 'false' ? undefined : process.env.PULL_REQUEST,
      isPr: process.env.IS_PULL_REQUEST && process.env.IS_PULL_REQUEST === 'true',
      slug: process.env.SHIPPABLE_REPO_SLUG,
      root: process.env.SHIPPABLE_BUILD_DIR,
    };
  },
};
