// https://docs.travis-ci.com/user/environment-variables

module.exports = {
	detect() {
		return Boolean(process.env.TRAVIS);
	},
	configuration() {
		return {
			name: 'Travis CI',
			service: 'travis',
			commit: process.env.TRAVIS_COMMIT,
			build: process.env.TRAVIS_BUILD_NUMBER,
			branch: process.env.TRAVIS_BRANCH,
			job: process.env.TRAVIS_JOB_NUMBER,
			pr: process.env.TRAVIS_PULL_REQUEST === 'false' ? undefined : process.env.TRAVIS_PULL_REQUEST,
			isPr: process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false',
			slug: process.env.TRAVIS_REPO_SLUG,
			root: process.env.TRAVIS_BUILD_DIR,
		};
	},
};
