// https://cloud.google.com/cloud-build/docs/configuring-builds/substitute-variable-values

module.exports = {
	detect({env}) {
		return Boolean(env.$BUILD_ID);
	},
	configuration({env}) {
		const buildUrl = `https://console.cloud.google.com/cloud-build/builds/${env.$BUILD_ID}`;
		return {
			name: 'Google Cloud Build',
			service: 'cloudbuild',
			branch: env.$BRANCH_NAME,
			commit: env.$COMMIT_SHA,
			tag: env.$TAG_NAME,
			build: env.$BUILD_ID,
			buildUrl,
			slug: env.$REPO_NAME,
		};
	},
};
