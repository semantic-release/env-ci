// http://devcenter.wercker.com/docs/environment-variables/available-env-vars#hs_cos_wrapper_name

module.exports = {
  detect() {
    return Boolean(process.env.WERCKER_MAIN_PIPELINE_STARTED);
  },
  configuration() {
    return {
      service: 'wercker',
      commit: process.env.WERCKER_GIT_COMMIT,
      build: process.env.WERCKER_MAIN_PIPELINE_STARTED,
      branch: process.env.WERCKER_GIT_BRANCH,
      slug: `${process.env.WERCKER_GIT_OWNER}/${process.env.WERCKER_GIT_REPOSITORY}`,
      root: process.env.WERCKER_ROOT,
    };
  },
};
