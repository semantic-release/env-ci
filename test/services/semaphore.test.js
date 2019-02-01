import test from 'ava';
import semaphore from '../../services/semaphore';
import {gitRepo, gitCommit} from '../helpers/git-utils';

const env1 = {
	SEMAPHORE: 'true',
	SEMAPHORE_BUILD_NUMBER: '91011',
	BRANCH_NAME: 'master',
	SEMAPHORE_PROJECT_DIR: '/',
	SEMAPHORE_REPO_SLUG: 'owner/repo',
};

const env2 = {
	SEMAPHORE: 'true',
	SEMAPHORE_WORKFLOW_ID: '91011',
	SEMAPHORE_GIT_BRANCH: 'master',
	SEMAPHORE_GIT_SHA: '987',
	SEMAPHORE_GIT_URL: 'git@github.com:owner/repo.git',
	SEMAPHORE_JOB_ID: '123',
};

test('Push 1.0', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env: env1, cwd}), {
		name: 'Semaphore',
		service: 'semaphore',
		commit,
		build: '91011',
		branch: 'master',
		root: '/',
		pr: undefined,
		isPr: false,
		prBranch: undefined,
		slug: 'owner/repo',
	});
});

test('PR 1.0', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(
		semaphore.configuration({env: Object.assign({}, env1, {PULL_REQUEST_NUMBER: '10', BRANCH_NAME: 'pr-branch'}), cwd}),
		{
			name: 'Semaphore',
			service: 'semaphore',
			commit,
			build: '91011',
			branch: undefined,
			root: '/',
			pr: '10',
			isPr: true,
			prBranch: 'pr-branch',
			slug: 'owner/repo',
		}
	);
});

test('Push 2.0', async t => {
	const {cwd} = await gitRepo(true);

	t.deepEqual(semaphore.configuration({env: env2, cwd}), {
		name: 'Semaphore',
		service: 'semaphore',
		commit: '987',
		build: '91011',
		branch: 'master',
		slug: 'owner/repo',
		job: '123',
	});
});

test('PR 2.0', async t => {
	const {cwd} = await gitRepo(true);

	t.deepEqual(semaphore.configuration({env: env2, cwd}), {
		name: 'Semaphore',
		service: 'semaphore',
		commit: '987',
		build: '91011',
		branch: 'master',
		slug: 'owner/repo',
		job: '123',
	});
});
