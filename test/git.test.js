import test from 'ava';
import git from '../lib/git';
import {gitRepo, gitCommit, gitHead, gitCheckout} from './helpers/git-utils';

// Save the current working diretory
const cwd = process.cwd();

test.afterEach.always(() => {
	// Restore the current working directory
	process.chdir(cwd);
});

test.serial('Git repository', async t => {
	await gitRepo();
	const commit = await gitCommit();

	t.deepEqual(git.configuration(), {commit, branch: 'master'});
});

test.serial('Git cloned repository', async t => {
	await gitRepo(true);

	t.deepEqual(git.configuration(), {commit: await gitHead(), branch: 'master'});
});

test.serial('Git repository with detached head', async t => {
	await gitRepo(true);
	await gitCheckout('HEAD~0', false);

	t.deepEqual(git.configuration(), {commit: await gitHead(), branch: 'master'});
});
