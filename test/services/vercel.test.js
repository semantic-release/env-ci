const test = require('ava');
const vercel = require('../../services/vercel');

const VERCEL_ENVS = {
  VERCEL: 'true',
  VERCEL_GIT_COMMIT_SHA: 'abc123',
  VERCEL_GIT_COMMIT_REF: 'master',
  VERCEL_GIT_REPO_OWNER: 'owner',
  VERCEL_GIT_REPO_SLUG: 'repo',
};

const VERCEL_OBSOLETE_ENVS = {
  NOW_GITHUB_DEPLOYMENT: '1',
  NOW_GITHUB_COMMIT_SHA: 'abc123',
  NOW_GITHUB_COMMIT_REF: 'master',
  NOW_GITHUB_ORG: 'owner',
  NOW_GITHUB_REPO: 'repo',
};

test('Push on Vercel', t => {
  t.deepEqual(vercel.configuration({env: VERCEL_ENVS}), {
    name: 'Vercel',
    service: 'vercel',
    commit: 'abc123',
    branch: 'master',
    slug: 'owner/repo',
  });
});

test('Push on Now', t => {
  t.deepEqual(vercel.configuration({env: VERCEL_OBSOLETE_ENVS}), {
    name: 'Vercel',
    service: 'vercel',
    commit: 'abc123',
    branch: 'master',
    slug: 'owner/repo',
  });
});
