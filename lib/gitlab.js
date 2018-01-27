// https://docs.gitlab.com/ce/ci/variables/README.html

module.exports = {
  detect() {
    return Boolean(process.env.GITLAB_CI);
  },
  configuration() {
    return {
      service: 'gitlab',
      commit: process.env.CI_COMMIT_SHA,
      build: process.env.CI_JOB_NAME,
      job: process.env.CI_JOB_STAGE,
      branch: process.env.CI_COMMIT_REF_NAME,
      slug: process.env.CI_PROJECT_PATH,
      root: process.env.CI_PROJECT_DIR,
    };
  },
};
