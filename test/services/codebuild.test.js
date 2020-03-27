const test = require('ava');
const codebuild = require('../../services/codebuild');
const {gitRepo, gitHead} = require('../helpers/git-utils');

const env = {
  CODEBUILD_BUILD_ID: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0',
  AWS_REGION: 'us-east-1',
  PWD: '/codebuild/output/src807365521/src/github.com/owner/repo',
};

test('Push', async t => {
  const {cwd} = await gitRepo(true);

  t.deepEqual(codebuild.configuration({env, cwd}), {
    name: 'AWS CodeBuild',
    service: 'codebuild',
    commit: await gitHead({cwd}),
    build: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0',
    branch: 'master',
    buildUrl:
      'https://console.aws.amazon.com/codebuild/home?region=us-east-1#/builds/env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0/view/new',
    root: '/codebuild/output/src807365521/src/github.com/owner/repo',
  });
});
