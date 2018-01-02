// https://www.appveyor.com/docs/environment-variables

module.exports = {
  detect() {
    return Boolean(process.env.APPVEYOR);
  },
  configuration() {
    return {
      service: 'appveyor',
      commit: process.env.APPVEYOR_REPO_COMMIT,
      build: process.env.APPVEYOR_BUILD_NUMBER,
      branch: process.env.APPVEYOR_REPO_BRANCH,
      job: process.env.APPVEYOR_JOB_NUMBER,
      pr: process.env.APPVEYOR_PULL_REQUEST_NUMBER,
      isPr: Boolean(process.env.APPVEYOR_PULL_REQUEST_NUMBER),
      slug: process.env.APPVEYOR_REPO_NAME,
      root: process.env.APPVEYOR_BUILD_FOLDER,
    };
  },
};
