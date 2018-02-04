import test from 'ava';
import buildkite from '../lib/buildkite';

test('Push', t => {
  process.env.BUILDKITE = 'true';
  process.env.BUILDKITE_COMMIT = '5678';
  process.env.BUILDKITE_BUILD_NUMBER = '91011';
  process.env.BUILDKITE_BUILD_URL = 'https://server.com/buildresult';
  process.env.BUILDKITE_BRANCH = 'master';
  process.env.BUILDKITE_PULL_REQUEST = 'false';
  process.env.BUILDKITE_BUILD_CHECKOUT_PATH = '/';
  process.env.BUILDKITE_ORGANIZATION_SLUG = 'owner';
  process.env.BUILDKITE_PROJECT_SLUG = 'repo';

  t.deepEqual(buildkite.configuration(), {
    service: 'buildkite',
    commit: '5678',
    build: '91011',
    buildUrl: 'https://server.com/buildresult',
    branch: 'master',
    root: '/',
    pr: undefined,
    isPr: false,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  process.env.BUILDKITE = 'true';
  process.env.BUILDKITE_COMMIT = '5678';
  process.env.BUILDKITE_BUILD_NUMBER = '91011';
  process.env.BUILDKITE_BRANCH = 'master';
  process.env.BUILDKITE_PULL_REQUEST = '10';
  process.env.BUILDKITE_BUILD_CHECKOUT_PATH = '/';
  process.env.BUILDKITE_ORGANIZATION_SLUG = 'owner';
  process.env.BUILDKITE_PROJECT_SLUG = 'repo';

  t.deepEqual(buildkite.configuration(), {
    service: 'buildkite',
    commit: '5678',
    build: '91011',
    buildUrl: 'https://server.com/buildresult',
    branch: 'master',
    root: '/',
    pr: '10',
    isPr: true,
    slug: 'owner/repo',
  });
});
