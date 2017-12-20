const git = require('../lib/git');

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

module.exports = {
  detect() {
    return Boolean(process.env.JENKINS_URL);
  },
  configuration() {
    return {
      service: 'jenkins',
      commit: process.env.ghprbActualCommit || process.env.GIT_COMMIT || git.head(),
      branch: process.env.ghprbSourceBranch || process.env.GIT_BRANCH || process.env.BRANCH_NAME,
      build: process.env.BUILD_NUMBER,
      root: process.env.WORKSPACE,
      pr: process.env.ghprbPullId || process.env.CHANGE_ID,
      isPr: Boolean(process.env.ghprbPullId || process.env.CHANGE_ID),
    };
  },
};
