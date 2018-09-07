// https://buddy.works/knowledge/deployments/how-use-environment-variables#default-environment-variables

module.exports = {
	detect() {
		return Boolean(process.env.BUDDY_WORKSPACE_ID);
	},
	configuration() {
		return {
			name: 'Buddy',
			service: 'buddy',
			commit: process.env.BUDDY_EXECUTION_REVISION,
			build: process.env.BUDDY_EXECUTION_ID,
			buildUrl: process.env.BUDDY_EXECUTION_URL,
			branch: process.env.BUDDY_EXECUTION_BRANCH,
			pr: process.env.BUDDY_EXECUTION_PULL_REQUEST_ID,
			isPr: Boolean(
				process.env.BUDDY_EXECUTION_PULL_REQUEST_ID && process.env.BUDDY_EXECUTION_PULL_REQUEST_ID !== 'false'
			),
			slug: process.env.BUDDY_REPO_SLUG,
		};
	},
};
