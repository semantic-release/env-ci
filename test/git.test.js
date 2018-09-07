import test from 'ava';
import git from '../lib/git';
import {gitRepo, gitCommit, gitHead, gitCheckout} from './helpers/git-utils';

test('Git local repository', async t => {
	const {cwd} = await gitRepo();
	const commit = await gitCommit('Test commit message', {cwd});

	t.deepEqual(git.configuration({cwd}), {commit, branch: 'master'});
});

test('Git cloned repository', async t => {
	const {cwd} = await gitRepo(true);

	t.deepEqual(git.configuration({cwd}), {commit: await gitHead({cwd}), branch: 'master'});
});

test('Git local repository with detached head', async t => {
	const {cwd} = await gitRepo();
	const commit = await gitCommit('Test commit message', {cwd});
	await gitCheckout('HEAD~0', false, {cwd});

	t.deepEqual(git.configuration({cwd}), {commit, branch: undefined});
});

test('Git cloned repository with detached head', async t => {
	const {cwd} = await gitRepo(true);
	await gitCheckout('HEAD~0', false, {cwd});

	t.deepEqual(git.configuration({cwd}), {commit: await gitHead({cwd}), branch: 'master'});
});
