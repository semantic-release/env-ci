// http://devcenter.bitrise.io/faq/available-environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.BITRISE_IO);
	},
	configuration({env}) {
		return {
			name: 'Bitrise',
			service: 'bitrise',
			commit: env.BITRISE_GIT_COMMIT,
			build: env.BITRISE_BUILD_NUMBER,
			buildUrl: env.BITRISE_BUILD_URL,
			branch: env.BITRISE_GIT_BRANCH,
			pr: env.BITRISE_PULL_REQUEST === 'false' ? undefined : env.BITRISE_PULL_REQUEST,
			isPr: Boolean(env.BITRISE_PULL_REQUEST && env.BITRISE_PULL_REQUEST !== 'false'),
			slug: env.BITRISE_APP_SLUG,
		};
	},
};
