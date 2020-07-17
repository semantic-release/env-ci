const test = require('ava');
const tempy = require('tempy');
const proxyquire = require('proxyquire');
const {gitRepo, gitCommit} = require('./helpers/git-utils');
const m = require('..');

test('Appveyor', t => {
  const {isCi, service} = m({env: {APPVEYOR: 'true'}});

  t.is(isCi, true);
  t.is(service, 'appveyor');
});

test('Bamboo', t => {
  const {isCi, service} = m({env: {bamboo_agentId: 'some bamboo agent id'}}); // eslint-disable-line camelcase

  t.is(isCi, true);
  t.is(service, 'bamboo');
});

test('Bitbucket', t => {
  const {isCi, service} = m({env: {BITBUCKET_BUILD_NUMBER: '123456'}});

  t.is(isCi, true);
  t.is(service, 'bitbucket');
});

test('Bitrise', t => {
  const {isCi, service} = m({env: {BITRISE_IO: 'true'}});

  t.is(isCi, true);
  t.is(service, 'bitrise');
});

test('Buddy', t => {
  const {isCi, service} = m({env: {BUDDY_WORKSPACE_ID: '1234'}});

  t.is(isCi, true);
  t.is(service, 'buddy');
});

test('Buildkite', t => {
  const {isCi, service} = m({env: {BUILDKITE: 'true'}});

  t.is(isCi, true);
  t.is(service, 'buildkite');
});

test('Circle CI', t => {
  const {isCi, service} = m({env: {CIRCLECI: 'true'}});

  t.is(isCi, true);
  t.is(service, 'circleci');
});

test('Cirrus CI', t => {
  const {isCi, service} = m({env: {CIRRUS_CI: 'true'}});

  t.is(isCi, true);
  t.is(service, 'cirrus');
});

test('AWS CodeBuild', t => {
  const {isCi, service} = m({env: {CODEBUILD_BUILD_ID: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0'}});

  t.is(isCi, true);
  t.is(service, 'codebuild');
});

test('Codefresh', t => {
  const {isCi, service} = m({env: {CF_BUILD_ID: '91011'}});

  t.is(isCi, true);
  t.is(service, 'codefresh');
});

test('Codeship', t => {
  const {isCi, service} = m({env: {CI_NAME: 'codeship'}});

  t.is(isCi, true);
  t.is(service, 'codeship');
});

test('Drone', t => {
  const {isCi, service} = m({env: {DRONE: 'true'}});

  t.is(isCi, true);
  t.is(service, 'drone');
});

test('GitHub', t => {
  const {isCi, service} = m({env: {GITHUB_ACTION: 'action-name'}});

  t.is(isCi, true);
  t.is(service, 'github');
});

test('GitLab', t => {
  const {isCi, service} = m({env: {GITLAB_CI: 'true'}});

  t.is(isCi, true);
  t.is(service, 'gitlab');
});

test('Jenkins', async t => {
  const {cwd} = await gitRepo();
  await gitCommit('Test commit message', {cwd});

  const {isCi, service} = m({env: {JENKINS_URL: 'http://jenkins.jenkins.example/'}, cwd});

  t.is(isCi, true);
  t.is(service, 'jenkins');
});

test('Puppet', t => {
  const {isCi, service} = m({env: {DISTELLI_APPNAME: 'app'}});

  t.is(isCi, true);
  t.is(service, 'puppet');
});

test('Sail CI', t => {
  const {isCi, service} = m({env: {SAILCI: 'true'}});

  t.is(isCi, true);
  t.is(service, 'sail');
});

test('Scrutinizer', t => {
  const {isCi, service} = m({env: {SCRUTINIZER: 'true'}});

  t.is(isCi, true);
  t.is(service, 'scrutinizer');
});

test('Semaphore', async t => {
  const {cwd} = await gitRepo();
  await gitCommit('Test commit message', {cwd});

  const {isCi, service} = m({env: {SEMAPHORE: 'true'}});

  t.is(isCi, true);
  t.is(service, 'semaphore');
});

test('Shippable', t => {
  const {isCi, service} = m({env: {SHIPPABLE: 'true'}});

  t.is(isCi, true);
  t.is(service, 'shippable');
});

test('TeamCity', t => {
  const {isCi, service} = m({env: {TEAMCITY_VERSION: '2017.1.2 (build 46812)'}});

  t.is(isCi, true);
  t.is(service, 'teamcity');
});

test('Travis', t => {
  const {isCi, service} = m({env: {TRAVIS: 'true'}});

  t.is(isCi, true);
  t.is(service, 'travis');
});

test('Vela', t => {
  const {isCi, service} = m({env: {VELA: 'true'}});

  t.is(isCi, true);
  t.is(service, 'vela');
});

test('Visual Studio Team Services', t => {
  const {isCi, service} = m({env: {BUILD_BUILDURI: 'https://fabrikamfiber.visualstudio.com/_git/Scripts'}});

  t.is(isCi, true);
  t.is(service, 'vsts');
});

test('Wercker', t => {
  const {isCi, service} = m({env: {WERCKER_MAIN_PIPELINE_STARTED: '123456'}});

  t.is(isCi, true);
  t.is(service, 'wercker');
});

test('Unknown CI and Git repository', async t => {
  const {cwd} = await gitRepo();
  await gitCommit('Test commit message', {cwd});

  const {isCi, service} = m({env: {CI: 'true'}, cwd});

  t.is(isCi, true);
  t.falsy(service);
});

test('Unknown CI and not a Git repository', t => {
  const cwd = tempy.directory();

  const {isCi, service} = m({env: {CI: 'true'}, cwd});

  t.is(isCi, true);
  t.falsy(service);
});

test('Not CI', t => {
  const cwd = tempy.directory();

  const {isCi, service} = m({env: {}, cwd});

  t.is(isCi, false);
  t.falsy(service);
});

test('Default options', t => {
  const m = proxyquire('..', {process: {env: {}, cwd: () => tempy.directory()}});

  const {isCi, service} = m();

  t.is(isCi, false);
  t.falsy(service);
});
