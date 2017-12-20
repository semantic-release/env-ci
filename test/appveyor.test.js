import test from 'ava';
import appveyor from '../lib/appveyor';

test('Push', t => {
  process.env.APPVEYOR = 'true';
  process.env.APPVEYOR_JOB_NUMBER = '1234';
  process.env.APPVEYOR_REPO_COMMIT = '5678';
  process.env.APPVEYOR_BUILD_NUMBER = '91011';
  process.env.APPVEYOR_REPO_BRANCH = 'master';
  process.env.APPVEYOR_REPO_NAME = 'owner/repo';
  process.env.APPVEYOR_BUILD_FOLDER = '/';
  delete process.env.APPVEYOR_PULL_REQUEST_NUMBER;

  t.deepEqual(appveyor.configuration(), {
    service: 'appveyor',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    job: '1234',
    pr: undefined,
    isPr: false,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  process.env.APPVEYOR = 'true';
  process.env.APPVEYOR_JOB_NUMBER = '1234';
  process.env.APPVEYOR_REPO_COMMIT = '5678';
  process.env.APPVEYOR_BUILD_NUMBER = '91011';
  process.env.APPVEYOR_REPO_NAME = 'owner/repo';
  process.env.APPVEYOR_BUILD_FOLDER = '/';
  process.env.APPVEYOR_PULL_REQUEST_NUMBER = '10';
  process.env.APPVEYOR_REPO_BRANCH = 'master';

  t.deepEqual(appveyor.configuration(), {
    service: 'appveyor',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    job: '1234',
    pr: '10',
    isPr: true,
    slug: 'owner/repo',
  });
});
