import test from 'ava';
import drone from '../lib/drone';

test('Push', t => {
	process.env.DRONE = 'true';
	process.env.DRONE_JOB_NUMBER = '1234';
	process.env.DRONE_COMMIT_SHA = '5678';
	process.env.DRONE_BUILD_NUMBER = '91011';
	process.env.DRONE_BRANCH = 'master';
	process.env.DRONE_REPO_OWNER = 'owner';
	process.env.DRONE_REPO_NAME = 'repo';
	delete process.env.DRONE_PULL_REQUEST;
	delete process.env.DRONE_BUILD_EVENT;

	t.deepEqual(drone.configuration(), {
		service: 'drone',
		commit: '5678',
		build: '91011',
		branch: 'master',
		job: '1234',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	process.env.DRONE = 'true';
	process.env.DRONE_JOB_NUMBER = '1234';
	process.env.DRONE_COMMIT_SHA = '5678';
	process.env.DRONE_BUILD_NUMBER = '91011';
	process.env.DRONE_BRANCH = 'master';
	process.env.DRONE_PULL_REQUEST = '10';
	process.env.DRONE_BUILD_EVENT = 'pull_request';
	process.env.DRONE_REPO_OWNER = 'owner';
	process.env.DRONE_REPO_NAME = 'repo';

	t.deepEqual(drone.configuration(), {
		service: 'drone',
		commit: '5678',
		build: '91011',
		branch: 'master',
		job: '1234',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
