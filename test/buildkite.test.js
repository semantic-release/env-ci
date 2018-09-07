import test from 'ava';
import buildkite from '../lib/buildkite';

const env = {
	BUILDKITE: 'true',
	BUILDKITE_COMMIT: '5678',
	BUILDKITE_BUILD_NUMBER: '91011',
	BUILDKITE_BUILD_URL: 'https://server.com/buildresult',
	BUILDKITE_BRANCH: 'master',
	BUILDKITE_PULL_REQUEST: 'false',
	BUILDKITE_BUILD_CHECKOUT_PATH: '/',
	BUILDKITE_ORGANIZATION_SLUG: 'owner',
	BUILDKITE_PROJECT_SLUG: 'repo',
};

test('Push', t => {
	t.deepEqual(buildkite.configuration({env}), {
		name: 'Buildkite',
		service: 'buildkite',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		root: '/',
		pr: undefined,
		isPr: false,
		slug: 'owner/repo',
	});
});

test('PR', t => {
	t.deepEqual(buildkite.configuration({env: Object.assign({}, env, {BUILDKITE_PULL_REQUEST: '10'})}), {
		name: 'Buildkite',
		service: 'buildkite',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		root: '/',
		pr: '10',
		isPr: true,
		slug: 'owner/repo',
	});
});
