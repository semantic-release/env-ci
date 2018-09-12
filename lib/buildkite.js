// https://buildkite.com/docs/builds/environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.BUILDKITE);
	},
	configuration({env}) {
		return {
			name: 'Buildkite',
			service: 'buildkite',
			build: env.BUILDKITE_BUILD_NUMBER,
			buildUrl: env.BUILDKITE_BUILD_URL,
			commit: env.BUILDKITE_COMMIT,
			tag: env.BUILDKITE_TAG,
			branch: env.BUILDKITE_BRANCH,
			slug: `${env.BUILDKITE_ORGANIZATION_SLUG}/${env.BUILDKITE_PROJECT_SLUG}`,
			pr: env.BUILDKITE_PULL_REQUEST === 'false' ? undefined : env.BUILDKITE_PULL_REQUEST,
			isPr: Boolean(env.BUILDKITE_PULL_REQUEST && env.BUILDKITE_PULL_REQUEST !== 'false'),
			root: env.BUILDKITE_BUILD_CHECKOUT_PATH,
		};
	},
};
