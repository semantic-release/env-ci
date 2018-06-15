import test from 'ava';
import circle from '../lib/circleci';

test('Push', t => {
	process.env.CIRCLECI = 'true';
	process.env.CIRCLE_BUILD_NUM = '1234';
	process.env.CIRCLE_BUILD_URL = 'https://server.com/buildresult';
	process.env.CIRCLE_SHA1 = '5678';
	process.env.CIRCLE_BRANCH = 'master';
	process.env.CIRCLE_NODE_INDEX = '1';
	process.env.CIRCLE_PROJECT_USERNAME = 'owner';
	process.env.CIRCLE_PROJECT_REPONAME = 'repo';
	delete process.env.CI_PULL_REQUEST;

	t.deepEqual(circle.configuration(), {
		name: 'CircleCI',
		service: 'circleci',
		commit: '5678',
		build: '1234',
		buildUrl: 'https://server.com/buildresult',
		job: '1234.1',
		branch: 'master',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR 1.0', t => {
	process.env.CIRCLECI = 'true';
	process.env.CIRCLE_BUILD_NUM = '1234';
	process.env.CIRCLE_SHA1 = '5678';
	process.env.CIRCLE_BRANCH = 'pr_branch';
	process.env.CIRCLE_NODE_INDEX = '1';
	process.env.CIRCLE_PROJECT_USERNAME = 'owner';
	process.env.CIRCLE_PROJECT_REPONAME = 'repo';
	process.env.CI_PULL_REQUEST = 'uri/pr/10';

	t.deepEqual(circle.configuration(), {
		name: 'CircleCI',
		service: 'circleci',
		commit: '5678',
		build: '1234',
		buildUrl: 'https://server.com/buildresult',
		job: '1234.1',
		branch: 'pr_branch',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});

test('PR 2.0', t => {
	process.env.CIRCLECI = 'true';
	process.env.CIRCLE_BUILD_NUM = '1234';
	process.env.CIRCLE_SHA1 = '5678';
	process.env.CIRCLE_BRANCH = 'pr_branch';
	process.env.CIRCLE_NODE_INDEX = '1';
	process.env.CIRCLE_PROJECT_USERNAME = 'owner';
	process.env.CIRCLE_PROJECT_REPONAME = 'repo';
	process.env.CIRCLE_PULL_REQUEST = 'uri/pr/10';
	delete process.env.CI_PULL_REQUEST;

	t.deepEqual(circle.configuration(), {
		name: 'CircleCI',
		service: 'circleci',
		commit: '5678',
		build: '1234',
		buildUrl: 'https://server.com/buildresult',
		job: '1234.1',
		branch: 'pr_branch',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});

test('PR 2.0 without pull uri', t => {
	process.env.CIRCLECI = 'true';
	process.env.CIRCLE_BUILD_NUM = '1234';
	process.env.CIRCLE_SHA1 = '5678';
	process.env.CIRCLE_BRANCH = 'pr_branch';
	process.env.CIRCLE_NODE_INDEX = '1';
	process.env.CIRCLE_PROJECT_USERNAME = 'owner';
	process.env.CIRCLE_PROJECT_REPONAME = 'repo';
	process.env.CIRCLE_PR_NUMBER = '10';
	delete process.env.CIRCLE_PULL_REQUEST;
	delete process.env.CI_PULL_REQUEST;

	t.deepEqual(circle.configuration(), {
		name: 'CircleCI',
		service: 'circleci',
		commit: '5678',
		build: '1234',
		buildUrl: 'https://server.com/buildresult',
		job: '1234.1',
		branch: 'pr_branch',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
