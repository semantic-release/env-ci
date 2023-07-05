import test from "ava";
import woodpecker from "../../services/woodpecker.js";

const env = {
  CI: "woodpecker",
  CI_JOB_NUMBER: "1234",
  CI_BUILD_LINK: "https://woodpecker-ci.example.com/owner/repo/91011",
  CI_COMMIT_SHA: "5678",
  CI_COMMIT_TAG: "tag_name",
  CI_BUILD_NUMBER: "91011",
  CI_COMMIT_BRANCH: "main",
  CI_REPO_OWNER: "owner",
  CI_REPO_NAME: "repo",
  CI_WORKSPACE: "/woodpecker/src/github.com/owner/repo",
};

test("Push", (t) => {
  t.deepEqual(woodpecker.configuration({ env }), {
    name: "Woodpecker CI",
    service: "woodpecker",
    commit: "5678",
    tag: "tag_name",
    build: "91011",
    buildUrl: "https://woodpecker-ci.example.com/owner/repo/91011",
    branch: "main",
    job: "1234",
    jobUrl: "https://woodpecker-ci.example.com/owner/repo/91011",
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: "owner/repo",
    root: "/woodpecker/src/github.com/owner/repo",
  });
});

test("PR", (t) => {
  t.deepEqual(
    woodpecker.configuration({
      env: {
        ...env,
        CI_COMMIT_PULL_REQUEST: "10",
        CI_BUILD_EVENT: "pull_request",
        CI_COMMIT_TARGET_BRANCH: "main",
        CI_COMMIT_SOURCE_BRANCH: "pr-branch",
      },
    }),
    {
      name: "Woodpecker CI",
      service: "woodpecker",
      commit: "5678",
      tag: "tag_name",
      build: "91011",
      buildUrl: "https://woodpecker-ci.example.com/owner/repo/91011",
      branch: "main",
      job: "1234",
      jobUrl: "https://woodpecker-ci.example.com/owner/repo/91011",
      pr: "10",
      isPr: true,
      prBranch: "pr-branch",
      slug: "owner/repo",
      root: "/woodpecker/src/github.com/owner/repo",
    },
  );
});
