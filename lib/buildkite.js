// https://buildkite.com/docs/builds/environment-variables

module.exports = {
	detect() {
		return Boolean(process.env.BUILDKITE);
	},
	configuration() {
		return {
			name: 'Buildkite',
			service: 'buildkite',
			build: process.env.BUILDKITE_BUILD_NUMBER,
			buildUrl: process.env.BUILDKITE_BUILD_URL,
			commit: process.env.BUILDKITE_COMMIT,
			branch: process.env.BUILDKITE_BRANCH,
			slug: `${process.env.BUILDKITE_ORGANIZATION_SLUG}/${process.env.BUILDKITE_PROJECT_SLUG}`,
			pr: process.env.BUILDKITE_PULL_REQUEST === 'false' ? undefined : process.env.BUILDKITE_PULL_REQUEST,
			isPr: process.env.BUILDKITE_PULL_REQUEST && process.env.BUILDKITE_PULL_REQUEST !== 'false',
			root: process.env.BUILDKITE_BUILD_CHECKOUT_PATH,
		};
	},
};
