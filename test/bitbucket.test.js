import test from 'ava';
import bitbucket from '../lib/bitbucket';

const env = {
	BITBUCKET_COMMIT: 'b5ce5ce',
	BITBUCKET_BUILD_NUMBER: '1964',
	BITBUCKET_BRANCH: 'master',
	BITBUCKET_REPO_SLUG: 'owner/repo',
	BITBUCKET_CLONE_DIR: '/',
};

test('Push', t => {
	t.deepEqual(bitbucket.configuration({env}), {
		name: 'Bitbucket Pipelines',
		service: 'bitbucket',
		commit: 'b5ce5ce',
		build: '1964',
		buildUrl: 'https://bitbucket.org/owner/repo/addon/pipelines/home#!/results/1964',
		branch: 'master',
		slug: 'owner/repo',
		root: '/',
	});
});
