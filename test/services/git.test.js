const test = require('ava');
const git = require('../../services/git');
const {gitRepo, gitCommit} = require('../helpers/git-utils');

test('Return "commit" and "branch" from local repository', async t => {
  const {cwd} = await gitRepo();
  const commit = await gitCommit('Test commit message', {cwd});

  t.deepEqual(git.configuration({cwd}), {commit, branch: 'master'});
});
