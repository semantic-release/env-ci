const {head} = require('./git');

// https://semaphoreci.com/docs/available-environment-variables.html

module.exports = {
	detect({env}) {
		return Boolean(env.SEMAPHORE);
	},
	configuration({env, cwd}) {
		return {
			name: 'Semaphore',
			service: 'semaphore',
			commit: head({env, cwd}),
			build: env.SEMAPHORE_BUILD_NUMBER,
			branch: env.BRANCH_NAME,
			pr: env.PULL_REQUEST_NUMBER,
			isPr: Boolean(env.PULL_REQUEST_NUMBER && env.PULL_REQUEST_NUMBER !== 'false'),
			slug: env.SEMAPHORE_REPO_SLUG,
			root: env.SEMAPHORE_PROJECT_DIR,
		};
	},
};
