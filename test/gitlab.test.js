import test from 'ava';
import gitlab from '../lib/gitlab';

test('Push', t => {
  process.env.GITLAB_CI = 'true';
  process.env.CI_COMMIT_SHA = '5678';
  process.env.CI_JOB_NAME = '91011';
  process.env.CI_JOB_STAGE = '1234';
  process.env.CI_COMMIT_REF_NAME = 'master';
  process.env.CI_REPOSITORY_URL = 'https://gitlab.com/owner/repo.git';
  process.env.CI_PROJECT_DIR = '/';

  t.deepEqual(gitlab.configuration(), {
    service: 'gitlab',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    job: '1234',
    slug: 'owner/repo',
  });
});

test('Push (no repo url)', t => {
  process.env.GITLAB_CI = 'true';
  process.env.CI_COMMIT_SHA = '5678';
  process.env.CI_JOB_NAME = '91011';
  process.env.CI_JOB_STAGE = '1234';
  process.env.CI_COMMIT_REF_NAME = 'master';
  process.env.CI_PROJECT_DIR = '/';
  delete process.env.CI_REPOSITORY_URL;

  t.deepEqual(gitlab.configuration(), {
    service: 'gitlab',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    job: '1234',
    slug: undefined,
  });
});
