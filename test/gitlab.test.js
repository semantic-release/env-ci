import test from 'ava';
import gitlab from '../lib/gitlab';

test('Push', t => {
  process.env.GITLAB_CI = 'true';
  process.env.CI_COMMIT_SHA = '5678';
  process.env.CI_JOB_NAME = '91011';
  process.env.CI_JOB_STAGE = '1234';
  process.env.CI_COMMIT_REF_NAME = 'master';
  process.env.CI_PROJECT_PATH = 'owner/repo';
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
