import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import teamcity from '../lib/teamcity';

const env = {
	TEAMCITY_VERSION: '2017.1.2 (build 46812)',
	BUILD_VCS_NUMBER: '5678',
	BUILD_NUMBER: '91011',
	TEAMCITY_BUILDCONF_NAME: 'owner/repo',
};

test('Push (no properties file)', t => {
	t.deepEqual(teamcity.configuration({env}), {
		name: 'TeamCity',
		service: 'teamcity',
		commit: '5678',
		build: '91011',
		slug: 'owner/repo',
	});
});

test('Push', t => {
	const propertiesFile = tempy.file({extension: 'properties'});
	const properties = ['teamcity.build.branch=master', 'teamcity.build.workingDir=/'];
	fs.writeFileSync(propertiesFile, properties.join('\n') + '\n');

	t.deepEqual(teamcity.configuration({env: Object.assign({}, env, {TEAMCITY_BUILD_PROPERTIES_FILE: propertiesFile})}), {
		name: 'TeamCity',
		service: 'teamcity',
		commit: '5678',
		build: '91011',
		branch: 'master',
		root: '/',
		slug: 'owner/repo',
	});
});
