// https://docs.travis-ci.com/user/environment-variables#default-environment-variables

module.exports = {
	detect({env}) {
		return Boolean(env.TRAVIS);
	},
	configuration({env}) {
		return {
			name: 'Travis CI',
			service: 'travis',
			commit: env.TRAVIS_COMMIT,
			tag: env.TRAVIS_TAG,
			build: env.TRAVIS_BUILD_NUMBER,
			branch: env.TRAVIS_BRANCH,
			job: env.TRAVIS_JOB_NUMBER,
			pr: env.TRAVIS_PULL_REQUEST === 'false' ? undefined : env.TRAVIS_PULL_REQUEST,
			isPr: Boolean(env.TRAVIS_PULL_REQUEST && env.TRAVIS_PULL_REQUEST !== 'false'),
			slug: env.TRAVIS_REPO_SLUG,
			root: env.TRAVIS_BUILD_DIR,
		};
	},
};
