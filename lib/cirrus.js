// https://cirrus-ci.org/guide/writing-tasks/#environment-variables

const CIRRUS_CI_DASHBOARD = 'https://cirrus-ci.com';

module.exports = {
	detect({env}) {
		return Boolean(env.CIRRUS_CI);
	},
	configuration({env}) {
		return {
			name: 'Cirrus CI',
			service: 'cirrus',
			commit: env.CIRRUS_CHANGE_IN_REPO,
			tag: env.CIRRUS_TAG,
			build: env.CIRRUS_BUILD_ID,
			buildUrl: `${CIRRUS_CI_DASHBOARD}/build/${env.CIRRUS_BUILD_ID}`,
			job: env.CIRRUS_TASK_ID,
			jobUrl: `${CIRRUS_CI_DASHBOARD}/task/${env.CIRRUS_TASK_ID}`,
			branch: env.CIRRUS_BRANCH,
			pr: env.CIRRUS_PR,
			isPr: Boolean(env.CIRRUS_PR && env.CIRRUS_PR !== 'false'),
			slug: env.CIRRUS_REPO_FULL_NAME,
			root: env.CIRRUS_WORKING_DIR,
		};
	},
};
