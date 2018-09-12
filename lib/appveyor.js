// https://www.appveyor.com/docs/environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.APPVEYOR);
	},
	configuration({env}) {
		return {
			name: 'Appveyor',
			service: 'appveyor',
			commit: env.APPVEYOR_REPO_COMMIT,
			tag: env.APPVEYOR_REPO_TAG_NAME,
			build: env.APPVEYOR_BUILD_NUMBER,
			buildUrl: `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/${env.APPVEYOR_BUILD_VERSION}`,
			branch: env.APPVEYOR_REPO_BRANCH,
			job: env.APPVEYOR_JOB_NUMBER,
			jobUrl: `https://ci.appveyor.com/project/${env.APPVEYOR_PROJECT_SLUG}/build/job/${env.APPVEYOR_JOB_ID}`,
			pr: env.APPVEYOR_PULL_REQUEST_NUMBER,
			isPr: Boolean(env.APPVEYOR_PULL_REQUEST_NUMBER),
			slug: env.APPVEYOR_REPO_NAME,
			root: env.APPVEYOR_BUILD_FOLDER,
		};
	},
};
