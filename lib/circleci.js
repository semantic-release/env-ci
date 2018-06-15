// Circle 1.0 docs: https://circleci.com/docs/1.0/environment-variables
// Circle 2.0 docs: https://circleci.com/docs/2.0/env-vars/

module.exports = {
	detect() {
		return Boolean(process.env.CIRCLECI);
	},
	configuration() {
		// Support both 1.0 and 2.0
		const pullRequest = process.env.CIRCLE_PULL_REQUEST || process.env.CI_PULL_REQUEST;
		return {
			name: 'CircleCI',
			service: 'circleci',
			build: process.env.CIRCLE_BUILD_NUM,
			buildUrl: process.env.CIRCLE_BUILD_URL,
			job: `${process.env.CIRCLE_BUILD_NUM}.${process.env.CIRCLE_NODE_INDEX}`,
			commit: process.env.CIRCLE_SHA1,
			branch: process.env.CIRCLE_BRANCH,
			pr: pullRequest ? pullRequest.split('/').pop() : undefined,
			isPr: Boolean(pullRequest),
			slug: `${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}`,
		};
	},
};
