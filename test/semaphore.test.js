import test from 'ava';
import semaphore from '../lib/semaphore';
import {gitRepo, gitCommit} from './helpers/git-utils';

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
		slug: 'owner/repo',
	});
});

test('PR', async t => {
	const {cwd} = await gitRepo(true);
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(semaphore.configuration({env: Object.assign({}, env, {PULL_REQUEST_NUMBER: '10'}), cwd}), {
		name: 'Semaphore',
		service: 'semaphore',
		commit,
		build: '91011',
		branch: 'master',
		root: '/',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
