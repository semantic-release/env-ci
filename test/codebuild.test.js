import test from 'ava';
import codebuild from '../lib/codebuild';

test('Push', t => {
	process.env.CODEBUILD_SOURCE_VERSION = 'e958e63b3af104ae6cc472a03831716b75e69148';
	process.env.CODEBUILD_BUILD_ID = 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0';
	process.env.HOME = '/root';
	process.env.OLDPWD = '/codebuild/output/src807365521/src/github.com/owner/repo';
	process.env.CODEBUILD_BUILD_SUCCEEDING = '1';
	process.env.CODEBUILD_BUILD_ARN =
		'arn:aws:codebuild:us-east-1:680502709288:build/env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0';
	process.env.CODEBUILD_SOURCE_REPO_URL = 'https://github.com/owner/repo.git';
	process.env.CODEBUILD_SRC_DIR = '/codebuild/output/src807365521/src/github.com/owner/repo';
	process.env.PWD = '/codebuild/output/src807365521/src/github.com/owner/repo';
	process.env.AWS_REGION = 'us-east-1';

	t.deepEqual(codebuild.configuration(), {
		name: 'AWS CodeBuild',
		service: 'codebuild',
		commit: 'e958e63b3af104ae6cc472a03831716b75e69148',
		build: 'env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0',
		buildUrl:
			'https://console.aws.amazon.com/codebuild/home?region=us-east-1#/builds/env-ci:40cc72d2-acd5-46f4-a86b-6a3dcd2a39a0/view/new',
		branch: 'master',
		root: '/codebuild/output/src807365521/src/github.com/owner/repo',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});
