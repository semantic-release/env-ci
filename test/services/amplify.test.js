const test = require('ava');
const amplify = require('../../services/amplify');

const env = {
  AWS_APP_ID: 'd44r7xst5a1wzk',
  AWS_COMMIT_ID: '9cb0bda49d77cd39682a7a17cfe204bd59ac375f',
  CODEBUILD_BUILD_ID: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0',
  CODEBUILD_BUILD_URL:
    'https://console.aws.amazon.com/codebuild/home?region=us-east-1#/builds/env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0/view/new',
  AWS_BRANCH: 'master',
  AWS_REGION: 'us-east-1',
  PWD: '/codebuild/output/src604025264/src/github.com/',
};

test('Push', t => {
  t.deepEqual(amplify.configuration({env}), {
    name: 'AWS Amplify',
    service: 'amplify',
    commit: '9cb0bda49d77cd39682a7a17cfe204bd59ac375f',
    build: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0',
    branch: 'master',
    buildUrl:
      'https://console.aws.amazon.com/codebuild/home?region=us-east-1#/builds/env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0/view/new',
    root: '/codebuild/output/src604025264/src/github.com/',
  });
});
