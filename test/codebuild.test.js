import test from 'ava';
import codebuild from '../lib/codebuild';
import {gitRepo, gitCommit} from './helpers/git-utils';

// Save the current working diretory
const cwd = process.cwd();

test.beforeEach(async () => {
	await gitRepo();
});

test.afterEach.always(() => {
	// Restore the current working directory
	process.chdir(cwd);
});

test('Push', async t => {
	const commit = await gitCommit();
	process.env.CODEBUILD_BUILD_ID = 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0';
	process.env.AWS_REGION = 'us-east-1';
	process.env.PWD = '/codebuild/output/src807365521/src/github.com/owner/repo';

	t.deepEqual(codebuild.configuration(), {
		name: 'AWS CodeBuild',
		service: 'codebuild',
		commit,
		build: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0',
		branch: 'master',
		buildUrl:
			'https://console.aws.amazon.com/codebuild/home?region=us-east-1#/builds/env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0/view/new',
		root: '/codebuild/output/src807365521/src/github.com/owner/repo',
	});
});
