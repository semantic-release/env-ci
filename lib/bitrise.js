// http://devcenter.bitrise.io/faq/available-environment-variables/

module.exports = {
  detect() {
    return Boolean(process.env.BITRISE_IO);
  },
  configuration() {
    return {
      service: 'bitrise',
      commit: process.env.BITRISE_GIT_COMMIT,
      build: process.env.BITRISE_BUILD_NUMBER,
      branch: process.env.BITRISE_GIT_BRANCH,
      pr: process.env.BITRISE_PULL_REQUEST === 'false' ? undefined : process.env.BITRISE_PULL_REQUEST,
      isPr: process.env.BITRISE_PULL_REQUEST && process.env.BITRISE_PULL_REQUEST !== 'false',
      slug: process.env.BITRISE_APP_SLUG,
    };
  },
};
