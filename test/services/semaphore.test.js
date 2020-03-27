const test = require('ava');
const semaphore = require('../../services/semaphore');
const {gitRepo, gitCommit} = require('../helpers/git-utils');

const env1 = {
  SEMAPHORE: 'true',
  SEMAPHORE_BUILD_NUMBER: '91011',
  BRANCH_NAME: 'master',
  SEMAPHORE_PROJECT_DIR: '/',
  SEMAPHORE_REPO_SLUG: 'owner/repo',
};

const env2 = {
  SEMAPHORE: 'true',
  SEMAPHORE_GIT_SHA: '5678',
  SEMAPHORE_JOB_ID: '91011',
  SEMAPHORE_GIT_BRANCH: 'master',
  SEMAPHORE_GIT_DIR: '/',
  SEMAPHORE_GIT_REPO_SLUG: 'owner/repo',
};

test('Push 1.0', async t => {
  const {cwd} = await gitRepo(true);
  const commit = await gitCommit('Test commit message', {cwd});

  t.deepEqual(semaphore.configuration({env: env1, cwd}), {
    name: 'Semaphore',
    service: 'semaphore',
    commit,
    tag: undefined,
    build: '91011',
    branch: 'master',
    root: '/',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
  });
});

test('PR 1.0', async t => {
  const {cwd} = await gitRepo(true);
  const commit = await gitCommit('Test commit message', {cwd});

  t.deepEqual(semaphore.configuration({env: {...env1, PULL_REQUEST_NUMBER: '10', BRANCH_NAME: 'pr-branch'}, cwd}), {
    name: 'Semaphore',
    service: 'semaphore',
    commit,
    tag: undefined,
    build: '91011',
    branch: undefined,
    root: '/',
    pr: '10',
    isPr: true,
    prBranch: 'pr-branch',
    slug: 'owner/repo',
  });
});

test('Push 2.0', t => {
  t.deepEqual(semaphore.configuration({env: {...env2, SEMAPHORE_GIT_TAG_NAME: 'v1.0.0'}}), {
    name: 'Semaphore',
    service: 'semaphore',
    commit: '5678',
    tag: 'v1.0.0',
    build: '91011',
    branch: 'master',
    root: '/',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
  });
});

test('PR 2.0', t => {
  t.deepEqual(
    semaphore.configuration({env: {...env2, SEMAPHORE_GIT_PR_NUMBER: '10', SEMAPHORE_GIT_PR_BRANCH: 'pr-branch'}}),
    {
      name: 'Semaphore',
      service: 'semaphore',
      commit: '5678',
      tag: undefined,
      build: '91011',
      branch: 'master',
      root: '/',
      pr: '10',
      isPr: true,
      prBranch: 'pr-branch',
      slug: 'owner/repo',
    }
  );
});
