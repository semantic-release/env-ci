import test from 'ava';
import appveyor from '../lib/buddy';

test('Push', t => {
	process.env.BUDDY_WORKSPACE_ID = '111';
	process.env.BUDDY_EXECUTION_ID = '5';
	process.env.BUDDY_EXECUTION_URL =
		'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129';
	process.env.BUDDY_EXECUTION_REVISION = '5678';
	process.env.BUDDY_EXECUTION_BRANCH = 'master';
	process.env.BUDDY_REPO_SLUG = 'owner/repo';
	delete process.env.BUDDY_EXECUTION_PULL_REQUEST_ID;

	t.deepEqual(appveyor.configuration(), {
		name: 'Buddy',
		service: 'buddy',
		commit: '5678',
		build: '5',
		buildUrl:
			'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129',
		branch: 'master',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	process.env.BUDDY_WORKSPACE_ID = '111';
	process.env.BUDDY_EXECUTION_ID = '5';
	process.env.BUDDY_EXECUTION_URL =
		'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129';
	process.env.BUDDY_EXECUTION_REVISION = '5678';
	process.env.BUDDY_EXECUTION_BRANCH = 'master';
	process.env.BUDDY_REPO_SLUG = 'owner/repo';
	process.env.BUDDY_EXECUTION_PULL_REQUEST_ID = '10';

	t.deepEqual(appveyor.configuration(), {
		name: 'Buddy',
		service: 'buddy',
		commit: '5678',
		build: '5',
		buildUrl:
			'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129',
		branch: 'master',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
