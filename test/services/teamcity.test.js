import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import teamcity from '../../services/teamcity';

const env = {
	TEAMCITY_VERSION: '2017.1.2 (build 46812)',
	BUILD_VCS_NUMBER: '5678',
	BUILD_NUMBER: '91011',
	TEAMCITY_BUILDCONF_NAME: 'owner/repo',
};

test('Push - with build properties file', t => {
	const buildFile = tempy.file({extension: 'properties'});
	const buildProperties = ['teamcity.build.branch=master', 'teamcity.build.workingDir=/'];
	fs.writeFileSync(buildFile, buildProperties.join('\n') + '\n');

	t.deepEqual(teamcity.configuration({env: Object.assign({}, env, {TEAMCITY_BUILD_PROPERTIES_FILE: buildFile})}), {
		name: 'TeamCity',
		service: 'teamcity',
		commit: '5678',
		build: '91011',
		branch: 'master',
		root: '/',
		slug: 'owner/repo',
	});
});

test('Push - without build properties file', t => {
	t.deepEqual(teamcity.configuration({env}), {
		name: 'TeamCity',
		service: 'teamcity',
		commit: '5678',
		build: '91011',
		branch: undefined,
		root: undefined,
		slug: 'owner/repo',
	});
});

test('Push - with build and config properties files', t => {
	const buildFile = tempy.file({extension: 'properties'});
	const configFile = tempy.file({extension: 'properties'});
	const buildProperties = ['teamcity.build.branch=master', `teamcity.configuration.properties.file=${configFile}`];
	const configProperties = ['teamcity.build.workingDir=/'];
	fs.writeFileSync(buildFile, buildProperties.join('\n') + '\n');
	fs.writeFileSync(configFile, configProperties.join('\n') + '\n');

	t.deepEqual(teamcity.configuration({env: Object.assign({}, env, {TEAMCITY_BUILD_PROPERTIES_FILE: buildFile})}), {
		name: 'TeamCity',
		service: 'teamcity',
		commit: '5678',
		build: '91011',
		branch: 'master',
		root: '/',
		slug: 'owner/repo',
	});
});

test('Push - prioritize build properties file values', t => {
	const buildFile = tempy.file({extension: 'properties'});
	const configFile = tempy.file({extension: 'properties'});
	const buildProperties = [
		'teamcity.build.workingDir=/',
		'teamcity.build.branch=master',
		`teamcity.configuration.properties.file=${configFile}`,
	];
	const configProperties = ['teamcity.build.branch=other'];
	fs.writeFileSync(buildFile, buildProperties.join('\n') + '\n');
	fs.writeFileSync(configFile, configProperties.join('\n') + '\n');

	t.deepEqual(teamcity.configuration({env: Object.assign({}, env, {TEAMCITY_BUILD_PROPERTIES_FILE: buildFile})}), {
		name: 'TeamCity',
		service: 'teamcity',
		commit: '5678',
		build: '91011',
		branch: 'master',
		root: '/',
		slug: 'owner/repo',
	});
});
