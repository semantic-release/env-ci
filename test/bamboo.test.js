import test from 'ava';
import bamboo from '../lib/bamboo';

/* eslint-disable camelcase */

test('Push', t => {
	process.env.bamboo_buildKey = '1234';
	process.env.bamboo_planRepository_1_revision = '5678';
	process.env.bamboo_buildNumber = '91011';
	process.env.bamboo_planRepository_1_branchName = 'master';
	process.env.bamboo_build_working_directory = '/some/working/dir';
	process.env.bamboo_buildResultsUrl = 'https://server.com/buildresult';

	t.deepEqual(bamboo.configuration(), {
		name: 'Bamboo',
		service: 'bamboo',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://server.com/buildresult',
		branch: 'master',
		job: '1234',
		root: '/some/working/dir',
	});
});
