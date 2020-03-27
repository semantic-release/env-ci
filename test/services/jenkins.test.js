const test = require('ava');
const jenkins = require('../../services/jenkins');

const env = {
  JENKINS_URL: 'http://jenkins.jenkins.example/',
  GIT_COMMIT: '5678',
  BUILD_NUMBER: '91011',
  BUILD_URL: 'http://jenkins.jenkins.example/buildResult',
  WORKSPACE: '/',
};

test('Push', t => {
  t.deepEqual(jenkins.configuration({env: {...env, GIT_BRANCH: 'master'}}), {
    name: 'Jenkins',
    service: 'jenkins',
    commit: '5678',
    build: '91011',
    buildUrl: 'http://jenkins.jenkins.example/buildResult',
    branch: 'master',
    root: '/',
    pr: undefined,
    prBranch: undefined,
    isPr: false,
  });
});

test('PR', t => {
  t.deepEqual(jenkins.configuration({env: {...env, BRANCH_NAME: 'pr-branch', CHANGE_ID: '10'}}), {
    name: 'Jenkins',
    service: 'jenkins',
    commit: '5678',
    build: '91011',
    buildUrl: 'http://jenkins.jenkins.example/buildResult',
    branch: undefined,
    root: '/',
    pr: '10',
    prBranch: 'pr-branch',
    isPr: true,
  });
});

test('PR (PR ghprb-plugin)', t => {
  t.deepEqual(
    jenkins.configuration({
      env: {...env, ghprbSourceBranch: 'pr-branch', ghprbTargetBranch: 'master', ghprbPullId: '10'},
    }),
    {
      name: 'Jenkins',
      service: 'jenkins',
      commit: '5678',
      build: '91011',
      buildUrl: 'http://jenkins.jenkins.example/buildResult',
      branch: 'master',
      root: '/',
      pr: '10',
      prBranch: 'pr-branch',
      isPr: true,
    }
  );
});

test('PR (gitlab-plugin)', t => {
  t.deepEqual(
    jenkins.configuration({
      env: {...env, ghprbSourceBranch: 'pr-branch', gitlabTargetBranch: 'master', gitlabMergeRequestId: '10'},
    }),
    {
      name: 'Jenkins',
      service: 'jenkins',
      commit: '5678',
      build: '91011',
      buildUrl: 'http://jenkins.jenkins.example/buildResult',
      branch: 'master',
      root: '/',
      pr: '10',
      prBranch: 'pr-branch',
      isPr: true,
    }
  );
});
