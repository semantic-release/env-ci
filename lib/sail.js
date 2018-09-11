// https://sail.ci/docs/environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.SAILCI);
	},
	configuration({env}) {
		return {
			name: 'Sail CI',
			service: 'sail',
			commit: env.SAIL_COMMIT_SHA,
			branch: env.SAIL_COMMIT_BRANCH,
			slug: `${env.SAIL_REPO_OWNER}/${env.SAIL_REPO_NAME}`,
			root: env.SAIL_CLONE_DIR,
			pr: env.SAIL_PULL_REQUEST_NUMBER,
			isPr: Boolean(env.SAIL_PULL_REQUEST_NUMBER),
		};
	},
};
