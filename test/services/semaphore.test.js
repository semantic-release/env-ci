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
	SEMAPHORE_GIT_BRANCH: 'master',
	SEMAPHORE_GIT_DIR: '/',
	SEMAPHORE_WORKFLOW_ID: 'ed55ffgf-98d4-56fe-04ce-g7fg8dd8dgd4',
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

test('Push 2.0', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env: env2, cwd}), {
		name: 'Semaphore',
		service: 'semaphore',
		commit,
		build: 'ed55ffgf-98d4-56fe-04ce-g7fg8dd8dgd4',
		branch: 'master',
		root: '/',
		pr: undefined,
		isPr: false,
		prBranch: undefined,
		slug: undefined,
	});
});

test('PR 1.0', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env: {...env1, PULL_REQUEST_NUMBER: '10', BRANCH_NAME: 'pr-branch'}, cwd}), {
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
	});
});

test('PR 2.0', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env: env2, cwd}), {
		name: 'Semaphore',
		service: 'semaphore',
		commit,
		build: 'ed55ffgf-98d4-56fe-04ce-g7fg8dd8dgd4',
		branch: 'master',
		root: '/',
		pr: undefined,
		isPr: false,
		prBranch: undefined,
		slug: undefined,
	});
});
