const {head} = require('../lib/git');

// https://wiki.jenkins.io/display/JENKINS/Building+a+software+project

module.exports = {
	detect({env}) {
		return Boolean(env.JENKINS_URL);
	},
	configuration({env, cwd}) {
		const pr = env.ghprbPullId || env.gitlabMergeRequestId || env.CHANGE_ID;
		const isPr = Boolean(pr);
		const localBranch = env.GIT_LOCAL_BRANCH || env.GIT_BRANCH || env.gitlabBranch || env.BRANCH_NAME;

		return {
			name: 'Jenkins',
			service: 'jenkins',
			commit: env.ghprbActualCommit || env.GIT_COMMIT || head({env, cwd}),
			branch: isPr ? env.ghprbTargetBranch || env.gitlabTargetBranch : localBranch,
			build: env.BUILD_NUMBER,
			buildUrl: env.BUILD_URL,
			root: env.WORKSPACE,
			pr,
			isPr,
			prBranch: isPr ? env.ghprbSourceBranch || env.gitlabSourceBranch || localBranch : undefined,
			// Jenkins with the Git Plugin https://wiki.jenkins.io/pages/viewpage.action?pageId=69273545
			// Special note to the bottom around environment variables
			slug:
				(env.GIT_URL_1 || env.GIT_URL || '') // Try and use the fork url if it exists, otherwise the default, otherwise empty
					.slice(0, -4) // Strip `.git` if it exists
					.split('/') // Turn into an array
					.slice(-2) // Grab last two elements. [owner, repo]
					.join('/') || undefined, // Bring back to a string, if empty (due to not available) return undefined
		};
	},
};
