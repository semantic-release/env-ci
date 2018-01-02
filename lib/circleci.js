// https://circleci.com/docs/1.0/environment-variables

module.exports = {
  detect() {
    return Boolean(process.env.CIRCLECI);
  },
  configuration() {
    return {
      service: 'circleci',
      build: `${process.env.CIRCLE_BUILD_NUM}.${process.env.CIRCLE_NODE_INDEX}`,
      job: `${process.env.CIRCLE_BUILD_NUM}.${process.env.CIRCLE_NODE_INDEX}`,
      commit: process.env.CIRCLE_SHA1,
      branch: process.env.CIRCLE_BRANCH,
      pr: process.env.CI_PULL_REQUEST ? process.env.CI_PULL_REQUEST.split('/').pop() : undefined,
      isPr: Boolean(process.env.CI_PULL_REQUEST),
      slug: `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`,
    };
  },
};
