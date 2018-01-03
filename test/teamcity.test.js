import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import teamcity from '../lib/teamcity';

test('Push', t => {
  const propertiesFile = tempy.file({extension: 'properties'});

  process.env.TEAMCITY_VERSION = '2017.1.2 (build 46812)';
  process.env.BUILD_VCS_NUMBER = '5678';
  process.env.BUILD_NUMBER = '91011';
  process.env.TEAMCITY_BUILDCONF_NAME = 'owner/repo';
  process.env.TEAMCITY_BUILD_PROPERTIES_FILE = propertiesFile;

  const properties = ['teamcity.build.branch=master', 'teamcity.build.workingDir=/'];
  fs.writeFileSync(propertiesFile, properties.join('\n') + '\n');

  t.deepEqual(teamcity.configuration(), {
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    branch: 'master',
    root: '/',
    slug: 'owner/repo',
  });
});

test('Push (no properties file)', t => {
  process.env.TEAMCITY_VERSION = '2017.1.2 (build 46812)';
  process.env.BUILD_VCS_NUMBER = '5678';
  process.env.BUILD_NUMBER = '91011';
  process.env.TEAMCITY_BUILDCONF_NAME = 'owner/repo';
  delete process.env.TEAMCITY_BUILD_PROPERTIES_FILE;

  t.deepEqual(teamcity.configuration(), {
    service: 'teamcity',
    commit: '5678',
    build: '91011',
    slug: 'owner/repo',
  });
});
