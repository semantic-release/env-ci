import test from 'ava';
import wercker from '../lib/wercker';

test('Push', t => {
	process.env.WERCKER_MAIN_PIPELINE_STARTED = '123456';
	process.env.WERCKER_RUN_URL = 'https://server.com/buildresult';
	process.env.WERCKER_GIT_COMMIT = '5678';
	process.env.WERCKER_GIT_BRANCH = 'master';
	process.env.WERCKER_ROOT = '/';
	process.env.WERCKER_GIT_OWNER = 'owner';
	process.env.WERCKER_GIT_REPOSITORY = 'repo';

	t.deepEqual(wercker.configuration(), {
		name: 'Wercker',
		service: 'wercker',
		commit: '5678',
		build: '123456',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		root: '/',
		slug: 'owner/repo',
	});
});
