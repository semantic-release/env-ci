const test = require('ava');
const drone = require('../../services/drone');

const env = {
  DRONE: 'true',
  DRONE_JOB_NUMBER: '1234',
  DRONE_BUILD_LINK: 'https://drone.example.com/owner/repo/91011',
  DRONE_COMMIT_SHA: '5678',
  DRONE_TAG: 'tag_name',
  DRONE_BUILD_NUMBER: '91011',
  DRONE_BRANCH: 'master',
  DRONE_REPO_OWNER: 'owner',
  DRONE_REPO_NAME: 'repo',
  DRONE_WORKSPACE: '/drone/src/github.com/owner/repo',
};

test('Push', t => {
  t.deepEqual(drone.configuration({env}), {
    name: 'Drone',
    service: 'drone',
    commit: '5678',
    tag: 'tag_name',
    build: '91011',
    buildUrl: 'https://drone.example.com/owner/repo/91011',
    branch: 'master',
    job: '1234',
    jobUrl: 'https://drone.example.com/owner/repo/91011',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
    root: '/drone/src/github.com/owner/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    drone.configuration({
      env: {
        ...env,
        DRONE_PULL_REQUEST: '10',
        DRONE_BUILD_EVENT: 'pull_request',
        DRONE_TARGET_BRANCH: 'master',
        DRONE_SOURCE_BRANCH: 'pr-branch',
      },
    }),
    {
      name: 'Drone',
      service: 'drone',
      commit: '5678',
      tag: 'tag_name',
      build: '91011',
      buildUrl: 'https://drone.example.com/owner/repo/91011',
      branch: 'master',
      job: '1234',
      jobUrl: 'https://drone.example.com/owner/repo/91011',
      pr: '10',
      isPr: true,
      prBranch: 'pr-branch',
      slug: 'owner/repo',
      root: '/drone/src/github.com/owner/repo',
    }
  );
});
