const test = require('ava');
const travis = require('../../services/travis');

const env = {
  TRAVIS: 'true',
  TRAVIS_JOB_NUMBER: '1234',
  TRAVIS_JOB_WEB_URL: 'https://travis-ci.com/owner/repo/jobs/1234',
  TRAVIS_COMMIT: '5678',
  TRAVIS_TAG: 'tag_name',
  TRAVIS_BUILD_NUMBER: '91011',
  TRAVIS_BUILD_WEB_URL: 'https://travis-ci.com/owner/repo/builds/91011',
  TRAVIS_BRANCH: 'master',
  TRAVIS_PULL_REQUEST: 'false',
  TRAVIS_BUILD_DIR: '/',
  TRAVIS_REPO_SLUG: 'owner/repo',
};

test('Push', t => {
  t.deepEqual(travis.configuration({env}), {
    name: 'Travis CI',
    service: 'travis',
    commit: '5678',
    tag: 'tag_name',
    build: '91011',
    buildUrl: 'https://travis-ci.com/owner/repo/builds/91011',
    branch: 'master',
    root: '/',
    job: '1234',
    jobUrl: 'https://travis-ci.com/owner/repo/jobs/1234',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    travis.configuration({
      env: {...env, TRAVIS_PULL_REQUEST: '10', TRAVIS_PULL_REQUEST_BRANCH: 'pr-branch'},
    }),
    {
      name: 'Travis CI',
      service: 'travis',
      commit: '5678',
      tag: 'tag_name',
      build: '91011',
      buildUrl: 'https://travis-ci.com/owner/repo/builds/91011',
      branch: 'master',
      root: '/',
      job: '1234',
      jobUrl: 'https://travis-ci.com/owner/repo/jobs/1234',
      pr: '10',
      isPr: true,
      prBranch: 'pr-branch',
      slug: 'owner/repo',
    }
  );
});
