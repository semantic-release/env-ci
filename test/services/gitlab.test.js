const test = require('ava');
const gitlab = require('../../services/gitlab');

const env = {
  GITLAB_CI: 'true',
  CI_COMMIT_SHA: '5678',
  CI_COMMIT_TAG: 'tag_name',
  CI_PIPELINE_ID: '91011',
  CI_JOB_ID: '1213',
  CI_PROJECT_URL: 'https://gitlab.com/owner/repo',
  CI_COMMIT_REF_NAME: 'master',
  CI_PROJECT_PATH: 'owner/repo',
  CI_PROJECT_DIR: '/',
};

test('Push', t => {
  t.deepEqual(gitlab.configuration({env}), {
    name: 'GitLab CI/CD',
    service: 'gitlab',
    commit: '5678',
    tag: 'tag_name',
    build: '91011',
    buildUrl: 'https://gitlab.com/owner/repo/pipelines/91011',
    branch: 'master',
    root: '/',
    job: '1213',
    jobUrl: 'https://gitlab.com/owner/repo/-/jobs/1213',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    gitlab.configuration({
      env: {
        ...env,
        CI_MERGE_REQUEST_ID: '10',
        CI_MERGE_REQUEST_TARGET_BRANCH_NAME: 'master',
        CI_MERGE_REQUEST_SOURCE_BRANCH_NAME: 'pr-branch',
      },
    }),
    {
      name: 'GitLab CI/CD',
      service: 'gitlab',
      commit: '5678',
      tag: 'tag_name',
      build: '91011',
      buildUrl: 'https://gitlab.com/owner/repo/pipelines/91011',
      branch: 'master',
      root: '/',
      job: '1213',
      jobUrl: 'https://gitlab.com/owner/repo/-/jobs/1213',
      pr: '10',
      isPr: true,
      prBranch: 'pr-branch',
      slug: 'owner/repo',
    }
  );
});
