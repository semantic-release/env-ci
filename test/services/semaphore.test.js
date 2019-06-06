import test from 'ava';
import semaphore from '../../services/semaphore';
import {gitRepo, gitCommit} from '../helpers/git-utils';

const env = {
	SEMAPHORE: 'true',
	SEMAPHORE_BUILD_NUMBER: '91011',
	BRANCH_NAME: 'master',
	SEMAPHORE_PROJECT_DIR: '/',
	SEMAPHORE_REPO_SLUG: 'owner/repo',
};

test('Push', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env, cwd}), {
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

test('PR', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env: {...env, PULL_REQUEST_NUMBER: '10', BRANCH_NAME: 'pr-branch'}, cwd}), {
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
