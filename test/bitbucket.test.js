import test from 'ava';
import bitbucket from '../lib/bitbucket';

test('Push', t => {
	process.env.BITBUCKET_COMMIT = 'b5ce5ce';
	process.env.BITBUCKET_BUILD_NUMBER = '1964';
	process.env.BITBUCKET_BRANCH = 'master';
	process.env.BITBUCKET_REPO_SLUG = 'owner/repo';
	process.env.BITBUCKET_CLONE_DIR = '/';

	t.deepEqual(bitbucket.configuration(), {
		service: 'bitbucket',
		commit: 'b5ce5ce',
		build: '1964',
		buildUrl: 'https://bitbucket.org/owner/repo/addon/pipelines/home#!/results/1964',
		branch: 'master',
		slug: 'owner/repo',
		root: '/',
	});
});

test('PR', t => {
	process.env.BITBUCKET_COMMIT = 'b5ce5ce';
	process.env.BITBUCKET_BUILD_NUMBER = '1964';
	process.env.BITBUCKET_BRANCH = 'master';
	process.env.BITBUCKET_REPO_SLUG = 'owner/repo';
	process.env.BITBUCKET_CLONE_DIR = '/';

	t.deepEqual(bitbucket.configuration(), {
		service: 'bitbucket',
		commit: 'b5ce5ce',
		build: '1964',
		buildUrl: 'https://bitbucket.org/owner/repo/addon/pipelines/home#!/results/1964',
		branch: 'master',
		slug: 'owner/repo',
		root: '/',
	});
});
