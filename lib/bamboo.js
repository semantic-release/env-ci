// https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html

module.exports = {
  detect() {
    // eslint-disable-next-line camelcase
    return Boolean(process.env.bamboo_agentId);
  },
  configuration() {
    return {
      service: 'bamboo',
      /* eslint-disable camelcase */
      commit: process.env.bamboo_planRepository_1_revision,
      build: process.env.bamboo_buildNumber,
      branch: process.env.bamboo_planRepository_1_branchName,
      job: process.env.bamboo_buildKey,
      root: process.env.bamboo_build_working_directory,
      /* eslint-enable camelcase */
    };
  },
};
