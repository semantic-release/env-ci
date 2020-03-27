const test = require('ava');
const buddy = require('../../services/buddy');

const env = {
  BUDDY_WORKSPACE_ID: '111',
  BUDDY_EXECUTION_ID: '5',
  BUDDY_EXECUTION_URL:
    'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129',
  BUDDY_EXECUTION_REVISION: '5678',
  BUDDY_EXECUTION_TAG: 'tag_name',
  BUDDY_EXECUTION_BRANCH: 'master',
  BUDDY_REPO_SLUG: 'owner/repo',
};

test('Push', t => {
  t.deepEqual(buddy.configuration({env}), {
    name: 'Buddy',
    service: 'buddy',
    commit: '5678',
    tag: 'tag_name',
    build: '5',
    buildUrl:
      'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129',
    branch: 'master',
    pr: undefined,
    isPr: false,
    slug: 'owner/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    buddy.configuration({
      env: {...env, BUDDY_EXECUTION_PULL_REQUEST_ID: 'pull/10', BUDDY_EXECUTION_BRANCH: undefined},
    }),
    {
      name: 'Buddy',
      service: 'buddy',
      commit: '5678',
      tag: 'tag_name',
      build: '5',
      buildUrl:
        'https://app.buddy.works/pierredenisvanduynslager/playground/pipelines/pipeline/1111/execution/5b92a93863115e06fe4f7129',
      branch: undefined,
      pr: '10',
      isPr: true,
      slug: 'owner/repo',
    }
  );
});
