const git = require('../lib/git');

// https://semaphoreci.com/docs/available-environment-variables.html

module.exports = {
  detect() {
    return Boolean(process.env.SEMAPHORE);
  },
  configuration() {
    return {
      service: 'semaphore',
      commit: git.head(),
      build: process.env.SEMAPHORE_BUILD_NUMBER,
      branch: process.env.BRANCH_NAME,
      pr: process.env.PULL_REQUEST_NUMBER,
      isPr: Boolean(process.env.PULL_REQUEST_NUMBER),
      slug: process.env.SEMAPHORE_REPO_SLUG,
      root: process.env.SEMAPHORE_PROJECT_DIR,
    };
  },
};
