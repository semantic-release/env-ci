import test from 'ava';
import git from '../lib/git';
import {gitRepo, gitCommit} from './helpers/git-utils';

// Save the current working diretory
const cwd = process.cwd();

test.beforeEach(async () => {
  await gitRepo('master');
});

test.afterEach.always(() => {
  // Restore the current working directory
  process.chdir(cwd);
});

test.serial('Git repository', async t => {
  const commit = await gitCommit();

  t.deepEqual(git.configuration(), {commit, branch: 'master'});
});
