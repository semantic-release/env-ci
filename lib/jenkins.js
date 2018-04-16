const git = require('./git');

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

module.exports = {
	detect() {
		return Boolean(process.env.JENKINS_URL);
	},
	configuration() {
		return {
			name: 'Jenkins',
			service: 'jenkins',
			commit: process.env.ghprbActualCommit || process.env.GIT_COMMIT || git.head(),
			branch:
				process.env.ghprbSourceBranch ||
				process.env.GIT_LOCAL_BRANCH ||
				process.env.GIT_BRANCH ||
				process.env.BRANCH_NAME,
			build: process.env.BUILD_NUMBER,
			buildUrl: process.env.BUILD_URL,
			root: process.env.WORKSPACE,
			pr: process.env.ghprbPullId || process.env.CHANGE_ID,
			isPr: Boolean(process.env.ghprbPullId || process.env.CHANGE_ID),
		};
	},
};
