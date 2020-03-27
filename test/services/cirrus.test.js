const test = require('ava');
const cirrus = require('../../services/cirrus');

const env = {
  CIRRUS_CI: 'true',
  CIRRUS_BUILD_ID: '1234',
  CIRRUS_CHANGE_IN_REPO: '5678',
  CIRRUS_TAG: 'tag_name',
  CIRRUS_TASK_ID: '91011',
  CIRRUS_BRANCH: 'master',
  CIRRUS_REPO_FULL_NAME: 'owner/repo',
  CIRRUS_WORKING_DIR: '/',
};

test('Push', t => {
  t.deepEqual(cirrus.configuration({env}), {
    name: 'Cirrus CI',
    service: 'cirrus',
    commit: '5678',
    tag: 'tag_name',
    build: '1234',
    buildUrl: 'https://cirrus-ci.com/build/1234',
    job: '91011',
    jobUrl: 'https://cirrus-ci.com/task/91011',
    branch: 'master',
    pr: undefined,
    isPr: false,
    slug: 'owner/repo',
    root: '/',
  });
});

test('PR', t => {
  t.deepEqual(
    cirrus.configuration({
      env: {...env, CIRRUS_PR: '239', CIRRUS_BASE_BRANCH: 'master', CIRRUS_BRANCH: 'pr-branch'},
    }),
    {
      name: 'Cirrus CI',
      service: 'cirrus',
      commit: '5678',
      tag: 'tag_name',
      build: '1234',
      buildUrl: 'https://cirrus-ci.com/build/1234',
      job: '91011',
      jobUrl: 'https://cirrus-ci.com/task/91011',
      branch: 'master',
      pr: '239',
      isPr: true,
      slug: 'owner/repo',
      root: '/',
    }
  );
});
