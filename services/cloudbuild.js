// https://cloud.google.com/cloud-build/docs/configuring-builds/substitute-variable-values

module.exports = {
	detect({env}) {
		return Boolean(env.PROJECT_ID);
	},
	configuration({env}) {
		return {
			name: 'Google Cloud Build',
			service: 'cloudbuild',
			build: env.BUILD_ID,
			buildUrl: `https://console.cloud.google.com/cloud-build/builds/${env.BUILD_ID}`,
			commit: env.COMMIT_SHA,
			tag: env.TAG_NAME,
			branch: env.BRANCH_NAME,
			slug: env.REPO_NAME,
			root: '/workspace',
		};
	},
};
