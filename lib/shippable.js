// http://docs.shippable.com/ci/env-vars/#stdEnv

module.exports = {
	detect({env}) {
		return Boolean(env.SHIPPABLE);
	},
	configuration({env}) {
		return {
			name: 'Shippable',
			service: 'shippable',
			commit: env.COMMIT,
			tag: env.GIT_TAG_NAME,
			build: env.BUILD_NUMBER,
			buildUrl: env.BUILD_URL,
			branch: env.BASE_BRANCH || env.BRANCH,
			job: env.JOB_NUMBER,
			pr: env.PULL_REQUEST === 'false' ? undefined : env.PULL_REQUEST,
			isPr: Boolean(env.IS_PULL_REQUEST && env.IS_PULL_REQUEST === 'true'),
			slug: env.SHIPPABLE_REPO_SLUG,
			root: env.SHIPPABLE_BUILD_DIR,
		};
	},
};
