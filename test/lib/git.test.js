const test = require('ava');
const {head, branch} = require('../../lib/git');
const {gitRepo, gitCommit, gitHead, gitCheckout} = require('../helpers/git-utils');

test('Git local repository', async t => {
  const {cwd} = await gitRepo();
  const commit = await gitCommit('Test commit message', {cwd});

  t.is(head({cwd}), commit);
  t.is(branch({cwd}), 'master');
});

test('Git cloned repository', async t => {
  const {cwd} = await gitRepo(true);

  t.is(head({cwd}), await gitHead({cwd}));
  t.is(branch({cwd}), 'master');
});

test('Git local repository with detached head', async t => {
  const {cwd} = await gitRepo();
  const commit = await gitCommit('Test commit message', {cwd});
  await gitCheckout('HEAD~0', false, {cwd});

  t.is(head({cwd}), commit);
  t.is(branch({cwd}), undefined);
});

test('Git cloned repository with detached head', async t => {
  const {cwd} = await gitRepo(true);
  await gitCheckout('HEAD~0', false, {cwd});

  t.is(head({cwd}), await gitHead({cwd}));
  t.is(branch({cwd}), 'master');
});
