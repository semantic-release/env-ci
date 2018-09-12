// Circle 2.0 docs: https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.CIRCLECI);
	},
	configuration({env}) {
		// Support both 1.0 and 2.0
		const pullRequestUrl = env.CIRCLE_PULL_REQUEST || env.CI_PULL_REQUEST;
		const pullRequest = pullRequestUrl ? pullRequestUrl.split('/').pop() : env.CIRCLE_PR_NUMBER;
		return {
			name: 'CircleCI',
			service: 'circleci',
			build: env.CIRCLE_BUILD_NUM,
			buildUrl: env.CIRCLE_BUILD_URL,
			job: `${env.CIRCLE_BUILD_NUM}.${env.CIRCLE_NODE_INDEX}`,
			commit: env.CIRCLE_SHA1,
			tag: env.CIRCLE_TAG,
			branch: env.CIRCLE_BRANCH,
			pr: pullRequest,
			isPr: Boolean(pullRequest),
			slug: `${env.CIRCLE_PROJECT_USERNAME}/${env.CIRCLE_PROJECT_REPONAME}`,
		};
	},
};
