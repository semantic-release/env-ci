const test = require('ava');
const sail = require('../../services/sail');

const env = {
  SAIL_COMMIT_SHA: 'full-commit-sha',
  SAIL_COMMIT_BRANCH: 'master',
  SAIL_REPO_OWNER: 'owner',
  SAIL_REPO_NAME: 'repo',
  SAIL_CLONE_DIR: '/workspace/repo',
};

test('Push', t => {
  t.deepEqual(sail.configuration({env}), {
    name: 'Sail CI',
    service: 'sail',
    commit: 'full-commit-sha',
    branch: 'master',
    slug: 'owner/repo',
    pr: undefined,
    isPr: false,
    root: '/workspace/repo',
  });
});

test('PR', t => {
  t.deepEqual(sail.configuration({env: {...env, SAIL_PULL_REQUEST_NUMBER: '10', SAIL_COMMIT_BRANCH: 'pull/10'}}), {
    name: 'Sail CI',
    service: 'sail',
    commit: 'full-commit-sha',
    branch: undefined,
    slug: 'owner/repo',
    root: '/workspace/repo',
    pr: '10',
    isPr: true,
  });
});
