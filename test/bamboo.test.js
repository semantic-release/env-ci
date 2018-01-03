import test from 'ava';
import bamboo from '../lib/bamboo';

test('Push', t => {
  /* eslint-disable camelcase */
  process.env.bamboo_planRepository_1_revision = 'some commit hash';
  process.env.bamboo_buildNumber = 'some build number';
  process.env.bamboo_planRepository_1_branchName = 'some branch name';
  process.env.bamboo_buildKey = 'some job number';
  process.env.bamboo_build_working_directory = '/some/working/dir';
  /* eslint-enable camelcase */

  t.deepEqual(bamboo.configuration(), {
    service: 'bamboo',
    commit: 'some commit hash',
    build: 'some build number',
    branch: 'some branch name',
    root: '/some/working/dir',
    job: 'some job number',
  });
});
