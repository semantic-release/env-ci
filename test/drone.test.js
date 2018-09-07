import test from 'ava';
import drone from '../lib/drone';

const env = {
	DRONE: 'true',
	DRONE_JOB_NUMBER: '1234',
	DRONE_COMMIT_SHA: '5678',
	DRONE_BUILD_NUMBER: '91011',
	DRONE_BRANCH: 'master',
	DRONE_REPO_OWNER: 'owner',
	DRONE_REPO_NAME: 'repo',
};

test('Push', t => {
	t.deepEqual(drone.configuration({env}), {
		name: 'Drone',
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
	t.deepEqual(
		drone.configuration({env: Object.assign({}, env, {DRONE_PULL_REQUEST: '10', DRONE_BUILD_EVENT: 'pull_request'})}),
		{
			name: 'Drone',
			service: 'drone',
			commit: '5678',
			build: '91011',
			branch: 'master',
			job: '1234',
			pr: '10',
			isPr: true,
			slug: 'owner/repo',
		}
	);
});
