const test = require('ava');
const wercker = require('../../services/wercker');

const env = {
  WERCKER_MAIN_PIPELINE_STARTED: '123456',
  WERCKER_RUN_URL: 'https://server.com/buildresult',
  WERCKER_GIT_COMMIT: '5678',
  WERCKER_GIT_BRANCH: 'master',
  WERCKER_ROOT: '/',
  WERCKER_GIT_OWNER: 'owner',
  WERCKER_GIT_REPOSITORY: 'repo',
};

test('Push', t => {
  t.deepEqual(wercker.configuration({env}), {
    name: 'Wercker',
    service: 'wercker',
    commit: '5678',
    build: '123456',
    buildUrl: 'https://server.com/buildresult',
    branch: 'master',
    root: '/',
    slug: 'owner/repo',
  });
});
