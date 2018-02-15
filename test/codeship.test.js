import test from 'ava';
import codeship from '../lib/codeship';

test('Push', t => {
	process.env.CI_NAME = 'codeship';
	process.env.CI_BUILD_NUMBER = '91011';
	process.env.CI_BUILD_URL = 'https://server.com/buildresult';
	process.env.CI_COMMIT_ID = '5678';
	process.env.CI_BRANCH = 'master';
	process.env.CI_REPO_NAME = 'owner/repo';

	t.deepEqual(codeship.configuration(), {
		service: 'codeship',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		slug: 'owner/repo',
	});
});
