// http://devcenter.wercker.com/docs/environment-variables/available-env-vars#hs_cos_wrapper_name

module.exports = {
	detect() {
		return Boolean(process.env.WERCKER_MAIN_PIPELINE_STARTED);
	},
	configuration() {
		return {
			name: 'Wercker',
			service: 'wercker',
			commit: process.env.WERCKER_GIT_COMMIT,
			build: process.env.WERCKER_MAIN_PIPELINE_STARTED,
			buildUrl: process.env.WERCKER_RUN_URL,
			branch: process.env.WERCKER_GIT_BRANCH,
			slug: `${process.env.WERCKER_GIT_OWNER}/${process.env.WERCKER_GIT_REPOSITORY}`,
			root: process.env.WERCKER_ROOT,
		};
	},
};
