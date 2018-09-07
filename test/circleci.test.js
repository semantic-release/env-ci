import test from 'ava';
import circle from '../lib/circleci';

const env = {
	CIRCLECI: 'true',
	CIRCLE_BUILD_NUM: '1234',
	CIRCLE_BUILD_URL: 'https://server.com/buildresult',
	CIRCLE_SHA1: '5678',
	CIRCLE_BRANCH: 'master',
	CIRCLE_NODE_INDEX: '1',
	CIRCLE_PROJECT_USERNAME: 'owner',
	CIRCLE_PROJECT_REPONAME: 'repo',
};

test('Push', t => {
	t.deepEqual(circle.configuration({env}), {
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
	t.deepEqual(
		circle.configuration({env: Object.assign({}, env, {CIRCLE_BRANCH: 'pr_branch', CI_PULL_REQUEST: 'uri/pr/10'})}),
		{
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
		}
	);
});

test('PR 2.0', t => {
	t.deepEqual(
		circle.configuration({env: Object.assign({}, env, {CIRCLE_BRANCH: 'pr_branch', CIRCLE_PULL_REQUEST: 'uri/pr/10'})}),
		{
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
		}
	);
});

test('PR 2.0 without pull uri', t => {
	t.deepEqual(
		circle.configuration({env: Object.assign({}, env, {CIRCLE_BRANCH: 'pr_branch', CIRCLE_PR_NUMBER: '10'})}),
		{
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
		}
	);
});
