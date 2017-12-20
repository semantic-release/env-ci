import test from 'ava';
import jenkins from '../lib/jenkins';

test('Push', t => {
  process.env.JENKINS_URL = 'http://jenkins.jenkins.example/';
  process.env.GIT_COMMIT = '5678';
  process.env.GIT_BRANCH = 'master';
  process.env.BUILD_NUMBER = '91011';
  process.env.WORKSPACE = '/';
  delete process.env.BRANCH_NAME;
  delete process.env.ghprbActualCommit;
  delete process.env.ghprbSourceBranch;
  delete process.env.CHANGE_ID;
  delete process.env.ghprbPullId;

  t.deepEqual(jenkins.configuration(), {
    service: 'jenkins',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    pr: undefined,
    isPr: false,
  });
});

test('PR', t => {
  process.env.JENKINS_URL = 'http://jenkins.jenkins.example/';
  process.env.GIT_COMMIT = '5678';
  process.env.BRANCH_NAME = 'pr_branch';
  process.env.BUILD_NUMBER = '91011';
  process.env.WORKSPACE = '/';
  process.env.CHANGE_ID = '10';
  delete process.env.GIT_BRANCH;
  delete process.env.ghprbActualCommit;
  delete process.env.ghprbSourceBranch;
  delete process.env.ghprbPullId;

  t.deepEqual(jenkins.configuration(), {
    service: 'jenkins',
    commit: '5678',
    build: '91011',
    branch: 'pr_branch',
    root: '/',
    pr: '10',
    isPr: true,
  });
});

test('PR (PR builder)', t => {
  process.env.JENKINS_URL = 'http://jenkins.jenkins.example/';
  process.env.ghprbActualCommit = '5678';
  process.env.ghprbSourceBranch = 'pr_branch';
  process.env.BUILD_NUMBER = '91011';
  process.env.WORKSPACE = '/';
  process.env.ghprbPullId = '10';
  delete process.env.GIT_BRANCH;
  delete process.env.GIT_COMMIT;
  delete process.env.BRANCH_NAME;
  delete process.env.CHANGE_ID;

  t.deepEqual(jenkins.configuration(), {
    service: 'jenkins',
    commit: '5678',
    build: '91011',
    branch: 'pr_branch',
    root: '/',
    pr: '10',
    isPr: true,
  });
});
