import test from 'ava';
import circle from '../lib/cirrus';

test('Push', t => {
	process.env.CIRRUS_CI = 'true';
	process.env.CIRRUS_BUILD_ID = '1234';
	process.env.CIRRUS_CHANGE_IN_REPO = '5678';
	process.env.CIRRUS_TASK_ID = '91011';
	process.env.CIRRUS_BRANCH = 'master';
	process.env.CIRRUS_REPO_FULL_NAME = 'owner/repo';
	process.env.CIRRUS_WORKING_DIR = '/';
	delete process.env.CIRRUS_PR;

	t.deepEqual(circle.configuration(), {
		name: 'Cirrus CI',
		service: 'cirrus',
		commit: '5678',
		build: '1234',
		buildUrl: 'https://cirrus-ci.com/build/1234',
		job: '91011',
		jobUrl: 'https://cirrus-ci.com/task/91011',
		branch: 'master',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
		root: '/',
	});
});

test('PR', t => {
	process.env.CIRRUS_CI = 'true';
	process.env.CIRRUS_BUILD_ID = '1234';
	process.env.CIRRUS_CHANGE_IN_REPO = '5678';
	process.env.CIRRUS_TASK_ID = '91011';
	process.env.CIRRUS_BRANCH = 'master';
	process.env.CIRRUS_REPO_FULL_NAME = 'owner/repo';
	process.env.CIRRUS_WORKING_DIR = '/';
	process.env.CIRRUS_PR = '239';

	t.deepEqual(circle.configuration(), {
		name: 'Cirrus CI',
		service: 'cirrus',
		commit: '5678',
		build: '1234',
		buildUrl: 'https://cirrus-ci.com/build/1234',
		job: '91011',
		jobUrl: 'https://cirrus-ci.com/task/91011',
		branch: 'master',
		pr: '239',
		isPr: true,
		slug: 'owner/repo',
		root: '/',
	});
});
