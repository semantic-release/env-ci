const test = require('ava');
const codefresh = require('../../services/codefresh');

const env = {
  CF_BUILD_ID: '91011',
  CF_REVISION: '5678',
  CF_BUILD_URL: 'https://g.codefresh.io//build/91011',
  CF_BRANCH: 'master',
  CF_REPO_OWNER: 'owner',
  CF_REPO_NAME: 'repo',
  CF_VOLUME_PATH: '/',
};

test('Push', t => {
  t.deepEqual(codefresh.configuration({env}), {
    name: 'Codefresh',
    service: 'codefresh',
    commit: '5678',
    build: '91011',
    buildUrl: 'https://g.codefresh.io//build/91011',
    branch: 'master',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    root: '/',
    slug: 'owner/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    codefresh.configuration({
      env: {...env, CF_PULL_REQUEST_NUMBER: '10', CF_PULL_REQUEST_TARGET: 'master', CF_BRANCH: 'pr-branch'},
    }),
    {
      name: 'Codefresh',
      service: 'codefresh',
      commit: '5678',
      build: '91011',
      buildUrl: 'https://g.codefresh.io//build/91011',
      branch: 'master',
      pr: '10',
      isPr: true,
      prBranch: 'pr-branch',
      root: '/',
      slug: 'owner/repo',
    }
  );
});
