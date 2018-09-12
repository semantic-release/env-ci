import test from 'ava';
import bitrise from '../lib/bitrise';

const env = {
	BITRISE_IO: 'true',
	BITRISE_GIT_COMMIT: '5678',
	BITRISE_GIT_TAG: 'tag_name',
	BITRISE_BUILD_NUMBER: '91011',
	BITRISE_BUILD_URL: 'https://server.com/buildresult',
	BITRISE_GIT_BRANCH: 'master',
	BITRISE_PULL_REQUEST: 'false',
	BITRISE_APP_SLUG: 'owner/repo',
};

test('Push', t => {
	t.deepEqual(bitrise.configuration({env}), {
		name: 'Bitrise',
		service: 'bitrise',
		commit: '5678',
		tag: 'tag_name',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	t.deepEqual(bitrise.configuration({env: Object.assign({}, env, {BITRISE_PULL_REQUEST: '10'})}), {
		name: 'Bitrise',
		service: 'bitrise',
		commit: '5678',
		tag: 'tag_name',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
