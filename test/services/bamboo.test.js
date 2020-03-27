const test = require('ava');
const bamboo = require('../../services/bamboo');

/* eslint-disable camelcase */

const env = {
  bamboo_buildKey: '1234',
  bamboo_planRepository_1_revision: '5678',
  bamboo_buildNumber: '91011',
  bamboo_planRepository_1_branchName: 'master',
  bamboo_build_working_directory: '/some/working/dir',
  bamboo_buildResultsUrl: 'https://server.com/buildresult',
};

test('Push', t => {
  t.deepEqual(bamboo.configuration({env}), {
    name: 'Bamboo',
    service: 'bamboo',
    commit: '5678',
    build: '91011',
    buildUrl: 'https://server.com/buildresult',
    branch: 'master',
    job: '1234',
    root: '/some/working/dir',
  });
});

/* eslint-enable camelcase */
