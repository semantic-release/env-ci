import test from 'ava';
import travis from '../lib/travis';

const env = {
	TRAVIS: 'true',
	TRAVIS_JOB_NUMBER: '1234',
	TRAVIS_COMMIT: '5678',
	TRAVIS_BUILD_NUMBER: '91011',
	TRAVIS_BRANCH: 'master',
	TRAVIS_PULL_REQUEST: 'false',
	TRAVIS_BUILD_DIR: '/',
	TRAVIS_REPO_SLUG: 'owner/repo',
};

test('Push', t => {
	t.deepEqual(travis.configuration({env}), {
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
	t.deepEqual(travis.configuration({env: Object.assign({}, env, {TRAVIS_PULL_REQUEST: '10'})}), {
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
