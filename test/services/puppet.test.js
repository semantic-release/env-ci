const test = require('ava');
const puppet = require('../../services/puppet');

const env = {
  DISTELLI_BUILDNUM: '1234',
  DISTELLI_RELEASE: 'https://server.com/buildresult',
  DISTELLI_RELREVISION: '5678',
  DISTELLI_RELBRANCH: 'master',
  DISTELLI_INSTALLHOME: '/opt/distelli',
};

test('Push', t => {
  t.deepEqual(puppet.configuration({env}), {
    name: 'Puppet',
    service: 'puppet',
    build: '1234',
    buildUrl: 'https://server.com/buildresult',
    commit: '5678',
    branch: 'master',
    root: '/opt/distelli',
  });
});
