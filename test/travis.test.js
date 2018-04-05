import test from 'ava';
import travis from '../lib/travis';

test('Push', t => {
	process.env.TRAVIS = 'true';
	process.env.TRAVIS_JOB_NUMBER = '1234';
	process.env.TRAVIS_COMMIT = '5678';
	process.env.TRAVIS_BUILD_NUMBER = '91011';
	process.env.TRAVIS_BRANCH = 'master';
	process.env.TRAVIS_PULL_REQUEST = 'false';
	process.env.TRAVIS_BUILD_DIR = '/';
	process.env.TRAVIS_REPO_SLUG = 'owner/repo';

	t.deepEqual(travis.configuration(), {
		name: 'Travis CI',
		service: 'travis',
		commit: '5678',
		build: '91011',
		branch: 'master',
		root: '/',
		job: '1234',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	process.env.TRAVIS = 'true';
	process.env.TRAVIS_JOB_NUMBER = '1234';
	process.env.TRAVIS_COMMIT = '5678';
	process.env.TRAVIS_BUILD_NUMBER = '91011';
	process.env.TRAVIS_BRANCH = 'master';
	process.env.TRAVIS_PULL_REQUEST = '10';
	process.env.TRAVIS_BUILD_DIR = '/';
	process.env.TRAVIS_REPO_SLUG = 'owner/repo';

	t.deepEqual(travis.configuration(), {
		name: 'Travis CI',
		service: 'travis',
		commit: '5678',
		build: '91011',
		branch: 'master',
		root: '/',
		job: '1234',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
