const test = require('ava');
const vela = require('../../services/vela');

const env = {
  VELA: 'true',
  BUILD_COMMIT: 'a1b2c3',
  BUILD_EVENT: 'push',
  BUILD_NUMBER: '25',
  BUILD_LINK: 'https://some-vela-instance.com/Org/Project/25',
  BUILD_BRANCH: 'my-branch',
  REPOSITORY_FULL_NAME: 'Org/Project',
  BUILD_WORKSPACE: '/home/Org/Project',
};

test('Push', t => {
  t.deepEqual(vela.configuration({env}), {
    name: 'Vela',
    service: 'vela',
    commit: 'a1b2c3',
    tag: undefined,
    build: '25',
    buildUrl: 'https://some-vela-instance.com/Org/Project/25',
    branch: 'my-branch',
    pr: undefined,
    isPr: false,
    slug: 'Org/Project',
    root: '/home/Org/Project',
  });
});

test('PR', t => {
  t.deepEqual(
    vela.configuration({
      env: {
        ...env,
        BUILD_EVENT: 'pull_request',
        BUILD_PULL_REQUEST_NUMBER: '1',
      },
    }),
    {
      name: 'Vela',
      service: 'vela',
      commit: 'a1b2c3',
      tag: undefined,
      build: '25',
      buildUrl: 'https://some-vela-instance.com/Org/Project/25',
      branch: 'my-branch',
      pr: '1',
      isPr: true,
      slug: 'Org/Project',
      root: '/home/Org/Project',
    }
  );
});

test('Tag', t => {
  t.deepEqual(
    vela.configuration({
      env: {
        ...env,
        BUILD_EVENT: 'tag',
        BUILD_TAG: 'v1.0.2',
      },
    }),
    {
      name: 'Vela',
      service: 'vela',
      commit: 'a1b2c3',
      tag: 'v1.0.2',
      build: '25',
      buildUrl: 'https://some-vela-instance.com/Org/Project/25',
      branch: 'my-branch',
      pr: undefined,
      isPr: false,
      slug: 'Org/Project',
      root: '/home/Org/Project',
    }
  );
});
