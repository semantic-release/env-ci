import test from 'ava';
import tempy from 'tempy';
import m from '..';
import {gitRepo, gitCommit} from './helpers/git-utils';

// Save the current working diretory
const cwd = process.cwd();

test.beforeEach(() => {
	delete process.env.CI;
	delete process.env.APPVEYOR;
	delete process.env.bamboo_agentId;
	delete process.env.BITBUCKET_BUILD_NUMBER;
	delete process.env.BITRISE_IO;
	delete process.env.BUDDY_WORKSPACE_ID;
	delete process.env.BUILDKITE;
	delete process.env.CIRCLECI;
	delete process.env.CIRRUS_CI;
	delete process.env.CODEBUILD_BUILD_ID;
	delete process.env.CI_NAME;
	delete process.env.DRONE;
	delete process.env.GITLAB_CI;
	delete process.env.JENKINS_URL;
	delete process.env.SEMAPHORE;
	delete process.env.SHIPPABLE;
	delete process.env.TEAMCITY_VERSION;
	delete process.env.TRAVIS;
	delete process.env.BUILD_BUILDURI;
	delete process.env.WERCKER_MAIN_PIPELINE_STARTED;
});

test.afterEach.always(() => {
	// Restore the current working directory
	process.chdir(cwd);
});

test.serial('Appveyor', t => {
	process.env.APPVEYOR = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'appveyor');
});

test.serial('Bamboo', t => {
	process.env.bamboo_agentId = 'some bamboo agent id'; // eslint-disable-line camelcase

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'bamboo');
});

test.serial('Bitbucket', t => {
	process.env.BITBUCKET_BUILD_NUMBER = '123456';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'bitbucket');
});

test.serial('Bitrise', t => {
	process.env.BITRISE_IO = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'bitrise');
});

test.serial('Buddy', t => {
	process.env.BUDDY_WORKSPACE_ID = '1234';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'buddy');
});

test.serial('Buildkite', t => {
	process.env.BUILDKITE = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'buildkite');
});

test.serial('Circle CI', t => {
	process.env.CIRCLECI = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'circleci');
});

test.serial('Cirrus CI', t => {
	process.env.CIRRUS_CI = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'cirrus');
});

test.serial('AWS CodeBuild', t => {
	process.env.CODEBUILD_BUILD_ID = 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'codebuild');
});

test.serial('Codeship', t => {
	process.env.CI_NAME = 'codeship';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'codeship');
});

test.serial('Drone', t => {
	process.env.DRONE = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'drone');
});

test.serial('Gitlab', t => {
	process.env.GITLAB_CI = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'gitlab');
});

test.serial('Jenkins', async t => {
	process.env.JENKINS_URL = 'http://jenkins.jenkins.example/';
	await gitRepo();
	await gitCommit();

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'jenkins');
});

test.serial('Semaphore', async t => {
	process.env.SEMAPHORE = 'true';
	await gitRepo();
	await gitCommit();

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'semaphore');
});

test.serial('Shippable', t => {
	process.env.SHIPPABLE = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'shippable');
});

test.serial('TeamCity', t => {
	process.env.TEAMCITY_VERSION = '2017.1.2 (build 46812)';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'teamcity');
});

test.serial('Travis', t => {
	process.env.TRAVIS = 'true';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'travis');
});

test.serial('Visual Studio Team Services', t => {
	process.env.BUILD_BUILDURI = 'https://fabrikamfiber.visualstudio.com/_git/Scripts';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'vsts');
});

test.serial('Wercker', t => {
	process.env.WERCKER_MAIN_PIPELINE_STARTED = '123456';

	const env = m();
	t.is(env.isCi, true);
	t.is(env.service, 'wercker');
});

test.serial('Unknown CI and Git repository', async t => {
	process.env.CI = 'true';
	await gitRepo();
	await gitCommit();

	const env = m();
	t.is(env.isCi, true);
	t.falsy(env.service);
});

test.serial('Unknown CI and not a Git repository', t => {
	process.env.CI = 'true';
	process.chdir(tempy.directory());
	const env = m();

	t.is(env.isCi, true);
	t.falsy(env.service);
});

test.serial('Not CI', t => {
	process.chdir(tempy.directory());
	const env = m();

	t.is(env.isCi, false);
	t.falsy(env.service);
});
