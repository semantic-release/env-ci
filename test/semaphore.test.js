import test from 'ava';
import semaphore from '../lib/semaphore';
import {gitRepo, gitCommit} from './helpers/git-utils';

// Save the current working diretory
const cwd = process.cwd();

test.beforeEach(async () => {
	await gitRepo();
});

test.afterEach.always(() => {
	// Restore the current working directory
	process.chdir(cwd);
});

test.serial('Push', async t => {
	const commit = await gitCommit();
	process.env.SEMAPHORE = 'true';
	process.env.SEMAPHORE_BUILD_NUMBER = '91011';
	process.env.BRANCH_NAME = 'master';
	process.env.SEMAPHORE_PROJECT_DIR = '/';
	process.env.SEMAPHORE_REPO_SLUG = 'owner/repo';
	delete process.env.PULL_REQUEST_NUMBER;

	t.deepEqual(semaphore.configuration(), {
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

test.serial('PR', async t => {
	const commit = await gitCommit();
	process.env.SEMAPHORE = 'true';
	process.env.SEMAPHORE_BUILD_NUMBER = '91011';
	process.env.BRANCH_NAME = 'master';
	process.env.PULL_REQUEST_NUMBER = '10';
	process.env.SEMAPHORE_PROJECT_DIR = '/';
	process.env.SEMAPHORE_REPO_SLUG = 'owner/repo';

	t.deepEqual(semaphore.configuration(), {
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
