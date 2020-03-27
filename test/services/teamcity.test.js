const fs = require('fs');
const test = require('ava');
const tempy = require('tempy');
const teamcity = require('../../services/teamcity');
const {gitRepo} = require('../helpers/git-utils');

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

  t.deepEqual(teamcity.configuration({env: {...env, TEAMCITY_BUILD_PROPERTIES_FILE: buildFile}}), {
    name: 'TeamCity',
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
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

  t.deepEqual(teamcity.configuration({env: {...env, TEAMCITY_BUILD_PROPERTIES_FILE: buildFile}}), {
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

  t.deepEqual(teamcity.configuration({env: {...env, TEAMCITY_BUILD_PROPERTIES_FILE: buildFile}}), {
    name: 'TeamCity',
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    slug: 'owner/repo',
  });
});

test('Push - without build properties file', async t => {
  const {cwd} = await gitRepo(true);

  t.deepEqual(teamcity.configuration({env, cwd}), {
    name: 'TeamCity',
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: undefined,
    slug: 'owner/repo',
  });
});

test('Push - with build and missing config properties files', async t => {
  const {cwd} = await gitRepo(true);

  const buildFile = tempy.file({extension: 'properties'});
  const buildProperties = ['teamcity.build.branch=master', 'teamcity.configuration.properties.file=/tmp/null'];
  fs.writeFileSync(buildFile, buildProperties.join('\n') + '\n');

  t.deepEqual(teamcity.configuration({env: {...env, TEAMCITY_BUILD_PROPERTIES_FILE: buildFile}, cwd}), {
    name: 'TeamCity',
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: undefined,
    slug: 'owner/repo',
  });
});

test('Push - with missing build properties files', async t => {
  const {cwd} = await gitRepo(true);

  t.deepEqual(teamcity.configuration({env: {...env, TEAMCITY_BUILD_PROPERTIES_FILE: '/tmp/null'}, cwd}), {
    name: 'TeamCity',
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: undefined,
    slug: 'owner/repo',
  });
});
