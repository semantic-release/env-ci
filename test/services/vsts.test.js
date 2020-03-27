const test = require('ava');
const vsts = require('../../services/vsts');

const env = {
  BUILD_BUILDURI: 'https://fabrikamfiber.visualstudio.com/_git/Scripts',
  BUILD_SOURCEVERSION: '5678',
  BUILD_BUILDNUMBER: '1234',
  BUILD_SOURCEBRANCH: 'master',
  BUILD_REPOSITORY_LOCALPATH: '/',
};

test('Push', t => {
  t.deepEqual(vsts.configuration({env}), {
    name: 'Visual Studio Team Services',
    service: 'vsts',
    commit: '5678',
    build: '1234',
    branch: 'master',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    root: '/',
  });
});

test('Push - with long branch name', t => {
  t.deepEqual(vsts.configuration({env: {...env, BUILD_SOURCEBRANCH: 'refs/heads/master'}}), {
    name: 'Visual Studio Team Services',
    service: 'vsts',
    commit: '5678',
    build: '1234',
    branch: 'master',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    root: '/',
  });
});

test('PR', t => {
  t.deepEqual(
    vsts.configuration({
      env: {
        ...env,
        SYSTEM_PULLREQUEST_PULLREQUESTID: '9',
        SYSTEM_PULLREQUEST_TARGETBRANCH: 'master',
        SYSTEM_PULLREQUEST_SOURCEBRANCH: 'pr-branch',
      },
    }),
    {
      name: 'Visual Studio Team Services',
      service: 'vsts',
      commit: '5678',
      build: '1234',
      branch: 'master',
      pr: '9',
      isPr: true,
      prBranch: 'pr-branch',
      root: '/',
    }
  );
});
