const fs = require('fs');
const test = require('ava');
const tempy = require('tempy');
const github = require('../../services/github');

/* eslint camelcase: ["error", {properties: "never"}] */

const env = {
  GITHUB_ACTION: 'action-name',
  GITHUB_SHA: '1234',
  GITHUB_REF: 'refs/heads/master',
  GITHUB_REPOSITORY: 'owner/repo',
  GITHUB_WORKSPACE: '/workspace',
};

test('Push', t => {
  t.deepEqual(github.configuration({env}), {
    name: 'GitHub Actions',
    service: 'github',
    commit: '1234',
    branch: 'master',
    isPr: false,
    prBranch: undefined,
    root: '/workspace',
    slug: 'owner/repo',
  });
});

test('Push - with short branch name', t => {
  t.deepEqual(github.configuration({env: {...env, GITHUB_REF: 'master'}}), {
    name: 'GitHub Actions',
    service: 'github',
    commit: '1234',
    branch: 'master',
    isPr: false,
    prBranch: undefined,
    root: '/workspace',
    slug: 'owner/repo',
  });
});

test('PR - with event.json file', t => {
  const eventFile = tempy.file({extension: 'json'});
  const event = {pull_request: {number: '10', head: {ref: 'refs/heads/master'}}};
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: 'pull_request',
        GITHUB_REF: 'refs/heads/pr-branch',
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: 'GitHub Actions',
      service: 'github',
      commit: '1234',
      branch: 'master',
      isPr: true,
      prBranch: 'pr-branch',
      pr: '10',
      root: '/workspace',
      slug: 'owner/repo',
    }
  );
});

test('PR - with event.json file and short branch name', t => {
  const eventFile = tempy.file({extension: 'json'});
  const event = {pull_request: {number: '10', head: {ref: 'master'}}};
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: 'pull_request',
        GITHUB_REF: 'refs/heads/pr-branch',
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: 'GitHub Actions',
      service: 'github',
      commit: '1234',
      branch: 'master',
      isPr: true,
      prBranch: 'pr-branch',
      pr: '10',
      root: '/workspace',
      slug: 'owner/repo',
    }
  );
});

test('PR - with missing event.json file', t => {
  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: 'pull_request',
        GITHUB_REF: 'refs/heads/pr-branch',
        GITHUB_EVENT_PATH: '/tmp/null',
      },
    }),
    {
      name: 'GitHub Actions',
      service: 'github',
      commit: '1234',
      branch: undefined,
      isPr: true,
      prBranch: 'pr-branch',
      pr: undefined,
      root: '/workspace',
      slug: 'owner/repo',
    }
  );
});

test('PR - with missing event.json file path', t => {
  t.deepEqual(
    github.configuration({
      env: {...env, GITHUB_EVENT_NAME: 'pull_request', GITHUB_REF: 'refs/heads/pr-branch'},
    }),
    {
      name: 'GitHub Actions',
      service: 'github',
      commit: '1234',
      branch: undefined,
      isPr: true,
      prBranch: 'pr-branch',
      pr: undefined,
      root: '/workspace',
      slug: 'owner/repo',
    }
  );
});

test('PR - with missing "pull_request" in event.json file', t => {
  const eventFile = tempy.file({extension: 'json'});
  const event = {};
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: 'pull_request',
        GITHUB_REF: 'refs/heads/pr-branch',
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: 'GitHub Actions',
      service: 'github',
      commit: '1234',
      branch: undefined,
      isPr: true,
      prBranch: 'pr-branch',
      pr: undefined,
      root: '/workspace',
      slug: 'owner/repo',
    }
  );
});

test('PR - with missing "pull_request.base" in event.json file', t => {
  const eventFile = tempy.file({extension: 'json'});
  const event = {pull_request: {number: '10'}};
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: 'pull_request',
        GITHUB_REF: 'refs/heads/pr-branch',
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: 'GitHub Actions',
      service: 'github',
      commit: '1234',
      branch: undefined,
      isPr: true,
      prBranch: 'pr-branch',
      pr: '10',
      root: '/workspace',
      slug: 'owner/repo',
    }
  );
});

test('Push - with incorrect branch name', t => {
  t.deepEqual(github.configuration({env: {...env, GITHUB_REF: ''}}), {
    name: 'GitHub Actions',
    service: 'github',
    commit: '1234',
    branch: undefined,
    isPr: false,
    prBranch: undefined,
    root: '/workspace',
    slug: 'owner/repo',
  });
});
