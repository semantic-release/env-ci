const {head} = require('./git');

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

module.exports = {
	detect({env}) {
		return Boolean(env.JENKINS_URL);
	},
	configuration({env, cwd}) {
		return {
			name: 'Jenkins',
			service: 'jenkins',
			commit: env.ghprbActualCommit || env.GIT_COMMIT || head({env, cwd}),
			branch: env.ghprbSourceBranch || env.GIT_LOCAL_BRANCH || env.GIT_BRANCH || env.BRANCH_NAME,
			build: env.BUILD_NUMBER,
			buildUrl: env.BUILD_URL,
			root: env.WORKSPACE,
			pr: env.ghprbPullId || env.CHANGE_ID,
			isPr: Boolean(env.ghprbPullId || env.CHANGE_ID),
		};
	},
};
