// https://www.appveyor.com/docs/environment-variables

module.exports = {
	detect() {
		return Boolean(process.env.APPVEYOR);
	},
	configuration() {
		return {
			name: 'Appveyor',
			service: 'appveyor',
			commit: process.env.APPVEYOR_REPO_COMMIT,
			build: process.env.APPVEYOR_BUILD_NUMBER,
			buildUrl: `https://ci.appveyor.com/project/${process.env.APPVEYOR_PROJECT_SLUG}/build/${
				process.env.APPVEYOR_BUILD_VERSION
			}`,
			branch: process.env.APPVEYOR_REPO_BRANCH,
			job: process.env.APPVEYOR_JOB_NUMBER,
			jobUrl: `https://ci.appveyor.com/project/${process.env.APPVEYOR_PROJECT_SLUG}/build/job/${
				process.env.APPVEYOR_JOB_ID
			}`,
			pr: process.env.APPVEYOR_PULL_REQUEST_NUMBER,
			isPr: Boolean(process.env.APPVEYOR_PULL_REQUEST_NUMBER),
			slug: process.env.APPVEYOR_REPO_NAME,
			root: process.env.APPVEYOR_BUILD_FOLDER,
		};
	},
};
