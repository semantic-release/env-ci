// https://buddy.works/knowledge/deployments/how-use-environment-variables#default-environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.BUDDY_WORKSPACE_ID);
	},
	configuration({env}) {
		return {
			name: 'Buddy',
			service: 'buddy',
			commit: env.BUDDY_EXECUTION_REVISION,
			tag: env.BUDDY_EXECUTION_TAG,
			build: env.BUDDY_EXECUTION_ID,
			buildUrl: env.BUDDY_EXECUTION_URL,
			branch: env.BUDDY_EXECUTION_BRANCH,
			pr: env.BUDDY_EXECUTION_PULL_REQUEST_ID,
			isPr: Boolean(env.BUDDY_EXECUTION_PULL_REQUEST_ID && env.BUDDY_EXECUTION_PULL_REQUEST_ID !== 'false'),
			slug: env.BUDDY_REPO_SLUG,
		};
	},
};
