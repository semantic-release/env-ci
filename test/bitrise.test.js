import test from 'ava';
import bitrise from '../lib/bitrise';

test('Push', t => {
  process.env.BITRISE_IO = 'true';
  process.env.BITRISE_GIT_COMMIT = '5678';
  process.env.BITRISE_BUILD_NUMBER = '91011';
  process.env.BITRISE_GIT_BRANCH = 'master';
  process.env.BITRISE_PULL_REQUEST = 'false';
  process.env.BITRISE_APP_SLUG = 'owner/repo';

  t.deepEqual(bitrise.configuration(), {
    service: 'bitrise',
    commit: '5678',
    build: '91011',
    branch: 'master',
    pr: undefined,
    isPr: false,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  process.env.BITRISE_IO = 'true';
  process.env.BITRISE_GIT_COMMIT = '5678';
  process.env.BITRISE_BUILD_NUMBER = '91011';
  process.env.BITRISE_GIT_BRANCH = 'master';
  process.env.BITRISE_PULL_REQUEST = '10';
  process.env.BITRISE_APP_SLUG = 'owner/repo';

  t.deepEqual(bitrise.configuration(), {
    service: 'bitrise',
    commit: '5678',
    build: '91011',
    branch: 'master',
    pr: '10',
    isPr: true,
    slug: 'owner/repo',
  });
});
