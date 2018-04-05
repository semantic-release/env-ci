// https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables

module.exports = {
	detect() {
		return process.env.CI_NAME && process.env.CI_NAME === 'codeship';
	},
	configuration() {
		return {
			name: 'Codeship',
			service: 'codeship',
			build: process.env.CI_BUILD_NUMBER,
			buildUrl: process.env.CI_BUILD_URL,
			commit: process.env.CI_COMMIT_ID,
			branch: process.env.CI_BRANCH,
			slug: process.env.CI_REPO_NAME,
		};
	},
};
