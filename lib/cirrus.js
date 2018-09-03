// https://cirrus-ci.org/guide/writing-tasks/#environment-variables

const CIRRUS_CI_DASHBOARD = 'https://cirrus-ci.com';

module.exports = {
	detect() {
		return Boolean(process.env.CIRRUS_CI);
	},
	configuration() {
		return {
			name: 'Cirrus CI',
			service: 'cirrus',
			commit: process.env.CIRRUS_CHANGE_IN_REPO,
			build: process.env.CIRRUS_BUILD_ID,
			buildUrl: `${CIRRUS_CI_DASHBOARD}/build/${process.env.CIRRUS_BUILD_ID}`,
			job: process.env.CIRRUS_TASK_ID,
			jobUrl: `${CIRRUS_CI_DASHBOARD}/task/${process.env.CIRRUS_TASK_ID}`,
			branch: process.env.CIRRUS_BRANCH,
			pr: process.env.CIRRUS_PR,
			isPr: Boolean(process.env.CIRRUS_PR && process.env.CIRRUS_PR !== 'false'),
			slug: process.env.CIRRUS_REPO_FULL_NAME,
			root: process.env.CIRRUS_WORKING_DIR,
		};
	},
};
