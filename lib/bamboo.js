// https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html

/* eslint-disable camelcase */

module.exports = {
	detect() {
		return Boolean(process.env.bamboo_agentId);
	},
	configuration() {
		return {
			name: 'Bamboo',
			service: 'bamboo',
			commit: process.env.bamboo_planRepository_1_revision,
			build: process.env.bamboo_buildNumber,
			buildUrl: process.env.bamboo_buildResultsUrl,
			branch: process.env.bamboo_planRepository_1_branchName,
			job: process.env.bamboo_buildKey,
			root: process.env.bamboo_build_working_directory,
		};
	},
};
