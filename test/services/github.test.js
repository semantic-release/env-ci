import fs from "node:fs";

import test from "ava";
import { temporaryFile } from "tempy";
import github from "../../services/github.js";

/* eslint camelcase: ["error", {properties: "never"}] */

const env = {
  GITHUB_ACTIONS: "true",
  GITHUB_SHA: "1234",
  GITHUB_REF: "refs/heads/master",
  GITHUB_REPOSITORY: "owner/repo",
  GITHUB_WORKSPACE: "/workspace",
  GITHUB_RUN_ID: "1246789",
};

test("Push", (t) => {
  t.deepEqual(github.configuration({ env }), {
    name: "GitHub Actions",
    service: "github",
    commit: "1234",
    build: "1246789",
    branch: "master",
    isPr: false,
    prBranch: undefined,
    root: "/workspace",
    slug: "owner/repo",
  });
});

test("Push - with short branch name", (t) => {
  t.deepEqual(github.configuration({ env: { ...env, GITHUB_REF: "master" } }), {
    name: "GitHub Actions",
    service: "github",
    commit: "1234",
    build: "1246789",
    branch: "master",
    isPr: false,
    prBranch: undefined,
    root: "/workspace",
    slug: "owner/repo",
  });
});

test("PR - with event.json file", (t) => {
  const eventFile = temporaryFile({ extension: "json" });
  const event = {
    pull_request: { number: "10", base: { ref: "refs/heads/master" } },
  };
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request",
        GITHUB_REF: "refs/pull/10/merge",
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: "master",
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: "10",
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test("PR - target", (t) => {
  const eventFile = temporaryFile({ extension: "json" });
  const event = {
    pull_request: { number: "10", base: { ref: "refs/heads/master" } },
  };
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request_target",
        GITHUB_REF: "refs/heads/master",
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: "master",
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: "10",
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test("PR - with event.json file and short branch name", (t) => {
  const eventFile = temporaryFile({ extension: "json" });
  const event = { pull_request: { number: "10", base: { ref: "master" } } };
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request",
        GITHUB_REF: "refs/pull/10/merge",
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: "master",
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: "10",
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test("PR - with missing event.json file", (t) => {
  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request",
        GITHUB_REF: "refs/pull/10/merge",
        GITHUB_EVENT_PATH: "/tmp/null",
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: undefined,
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: undefined,
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test("PR - with missing event.json file path", (t) => {
  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request",
        GITHUB_REF: "refs/pull/10/merge",
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: undefined,
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: undefined,
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test('PR - with missing "pull_request" in event.json file', (t) => {
  const eventFile = temporaryFile({ extension: "json" });
  const event = {};
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request",
        GITHUB_REF: "refs/pull/10/merge",
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: undefined,
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: undefined,
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test('PR - with missing "pull_request.base" in event.json file', (t) => {
  const eventFile = temporaryFile({ extension: "json" });
  const event = { pull_request: { number: "10" } };
  fs.writeFileSync(eventFile, JSON.stringify(event));

  t.deepEqual(
    github.configuration({
      env: {
        ...env,
        GITHUB_EVENT_NAME: "pull_request",
        GITHUB_REF: "refs/pull/10/merge",
        GITHUB_EVENT_PATH: eventFile,
      },
    }),
    {
      name: "GitHub Actions",
      service: "github",
      commit: "1234",
      build: "1246789",
      branch: undefined,
      isPr: true,
      prBranch: "refs/pull/10/merge",
      pr: "10",
      root: "/workspace",
      slug: "owner/repo",
    },
  );
});

test("Push - with incorrect branch name", (t) => {
  t.deepEqual(github.configuration({ env: { ...env, GITHUB_REF: "" } }), {
    name: "GitHub Actions",
    service: "github",
    commit: "1234",
    build: "1246789",
    branch: undefined,
    isPr: false,
    prBranch: undefined,
    root: "/workspace",
    slug: "owner/repo",
  });
});
