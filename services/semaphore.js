const parseGitUrl = require('git-url-parse');
const {head} = require('../lib/git');

// https://semaphoreci.com/docs/available-environment-variables.html

module.exports = {
	detect({env}) {
		return Boolean(env.SEMAPHORE);
	},
	configuration({env, cwd}) {
		if (env.BRANCH_NAME) {
			// Exists in v1 only
			const pr = env.PULL_REQUEST_NUMBER;
			const isPr = Boolean(pr);
			return {
				name: 'Semaphore',
				service: 'semaphore',
				commit: head({env, cwd}),
				build: env.SEMAPHORE_BUILD_NUMBER,
				branch: isPr ? undefined : env.BRANCH_NAME,
				pr,
				isPr,
				prBranch: isPr ? env.BRANCH_NAME : undefined,
				slug: env.SEMAPHORE_REPO_SLUG,
				root: env.SEMAPHORE_PROJECT_DIR,
			};
		}

		let parsedRepo;

		try {
			parsedRepo = parseGitUrl(env.SEMAPHORE_GIT_URL || '');
		} catch (error) {
			console.log(error);
		}

		// V2
		return {
			name: 'Semaphore',
			service: 'semaphore',
			build: env.SEMAPHORE_WORKFLOW_ID,
			branch: env.SEMAPHORE_GIT_BRANCH,
			job: env.SEMAPHORE_JOB_ID,
			commit: env.SEMAPHORE_GIT_SHA,
			slug: parsedRepo ? parsedRepo.owner + '/' + parsedRepo.name : undefined,
		};
	},
};
