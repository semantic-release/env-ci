import test from "ava";
import screwdriver from "../../services/screwdriver.js";

const env = {
  SCREWDRIVER: "true",
  SD_BUILD_SHA: "b5a94cdabf23b21303a0e6d5be5e96bd6300847a",
  SD_PROJECT: "259",
  SD_BUILD_ID: "173",
  SD_EVENT_ID: "1",
  SD_JOB_ID: "123",
  SD_PIPELINE_NAME: "d2lam/myPipeline",
  SCM_URL: "https://github.com/d2lam/myPipeline",
  GIT_URL: "https://github.com/d2lam/myPipeline.git",
  GIT_BRANCH: "my-branch",
  SD_ROOT_DIR: "sd/workspace",
  SD_SOURCE_DIR: "sd/workspace/src/github.com/d2lam/myPipeline",
};

test("Push", (t) => {
  t.deepEqual(
    screwdriver.configuration({
      env: {
        ...env,
        SD_EVENT_ID: "pipeline",
        GIT_BRANCH: "origin/main",
        SD_UI_BUILD_URL: `https://cd.screwdriver.cd/pipelines/${env.SD_PROJECT}/builds/${env.SD_BUILD_ID}`,
      },
    }),
    {
      name: "Screwdriver.cd",
      service: "screwdriver",
      commit: "b5a94cdabf23b21303a0e6d5be5e96bd6300847a",
      build: "173",
      buildUrl: "https://cd.screwdriver.cd/pipelines/259/builds/173",
      job: "123",
      branch: "origin/main",
      prBranch: undefined,
      pr: undefined,
      isPr: false,
      slug: "d2lam/myPipeline",
      root: "sd/workspace",
    },
  );
});

test("PR", (t) => {
  t.deepEqual(
    screwdriver.configuration({
      env: {
        ...env,
        SD_PULL_REQUEST: "1",
        SD_EVENT_ID: "pr",
        PR_BASE_BRANCH_NAME: "main",
        PR_BRANCH_NAME: "origin/feat/env-ci",
        GIT_BRANCH: "origin/refs/pull/1/head:pr",
        SD_UI_BUILD_URL: `https://cd.screwdriver.cd/pipelines/${env.SD_PROJECT}/builds/${env.SD_BUILD_ID}`,
      },
    }),
    {
      name: "Screwdriver.cd",
      service: "screwdriver",
      commit: "b5a94cdabf23b21303a0e6d5be5e96bd6300847a",
      build: "173",
      buildUrl: "https://cd.screwdriver.cd/pipelines/259/builds/173",
      job: "123",
      branch: "main",
      prBranch: "origin/feat/env-ci",
      pr: "1",
      isPr: true,
      slug: "d2lam/myPipeline",
      root: "sd/workspace",
    },
  );
});
