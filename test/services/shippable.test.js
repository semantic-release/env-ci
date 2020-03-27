const test = require('ava');
const shippable = require('../../services/shippable');

const env = {
  SHIPPABLE: 'true',
  JOB_NUMBER: '1234',
  COMMIT: '5678',
  GIT_TAG_NAME: 'tag_name',
  BUILD_NUMBER: '91011',
  BRANCH: 'master',
  BUILD_URL: 'https://server.com/buildresult',
  PULL_REQUEST: 'false',
  IS_PULL_REQUEST: 'false',
  SHIPPABLE_BUILD_DIR: '/',
  SHIPPABLE_REPO_SLUG: 'owner/repo',
};

test('Push', t => {
  t.deepEqual(shippable.configuration({env}), {
    name: 'Shippable',
    service: 'shippable',
    commit: '5678',
    tag: 'tag_name',
    build: '91011',
    buildUrl: 'https://server.com/buildresult',
    branch: 'master',
    root: '/',
    job: '1234',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    shippable.configuration({
      env: {...env, BASE_BRANCH: 'master', HEAD_BRANCH: 'pr-branch', IS_PULL_REQUEST: 'true', PULL_REQUEST: '10'},
    }),
    {
      name: 'Shippable',
      service: 'shippable',
      commit: '5678',
      tag: 'tag_name',
      build: '91011',
      buildUrl: 'https://server.com/buildresult',
      branch: 'master',
      root: '/',
      job: '1234',
      pr: '10',
      isPr: true,
      prBranch: 'pr-branch',
      slug: 'owner/repo',
    }
  );
});
