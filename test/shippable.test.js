import test from 'ava';
import shippable from '../lib/shippable';

test('Push', t => {
	process.env.SHIPPABLE = 'true';
	process.env.JOB_NUMBER = '1234';
	process.env.COMMIT = '5678';
	process.env.BUILD_NUMBER = '91011';
	process.env.BUILD_URL = 'https://server.com/buildresult';
	process.env.BRANCH = 'master';
	process.env.PULL_REQUEST = 'false';
	process.env.IS_PULL_REQUEST = 'false';
	process.env.SHIPPABLE_BUILD_DIR = '/';
	process.env.SHIPPABLE_REPO_SLUG = 'owner/repo';
	delete process.env.BASE_BRANCH;

	t.deepEqual(shippable.configuration(), {
		service: 'shippable',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		root: '/',
		job: '1234',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	process.env.SHIPPABLE = 'true';
	process.env.JOB_NUMBER = '1234';
	process.env.COMMIT = '5678';
	process.env.BUILD_NUMBER = '91011';
	process.env.BUILD_URL = 'https://server.com/buildresult';
	process.env.BASE_BRANCH = 'master';
	process.env.PULL_REQUEST = '10';
	process.env.IS_PULL_REQUEST = 'true';
	process.env.SHIPPABLE_BUILD_DIR = '/';
	process.env.SHIPPABLE_REPO_SLUG = 'owner/repo';
	delete process.env.BRANCH;

	t.deepEqual(shippable.configuration(), {
		service: 'shippable',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		root: '/',
		job: '1234',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
