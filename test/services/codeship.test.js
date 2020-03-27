const test = require('ava');
const codeship = require('../../services/codeship');

const env = {
  CI_NAME: 'codeship',
  CI_BUILD_NUMBER: '91011',
  CI_BUILD_URL: 'https://server.com/buildresult',
  CI_COMMIT_ID: '5678',
  CI_BRANCH: 'master',
  CI_REPO_NAME: 'owner/repo',
};

test('Push', t => {
  t.deepEqual(codeship.configuration({env}), {
    name: 'Codeship',
    service: 'codeship',
    commit: '5678',
    build: '91011',
    buildUrl: 'https://server.com/buildresult',
    branch: 'master',
    slug: 'owner/repo',
  });
});
