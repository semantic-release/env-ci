import test from "ava";
import vela from "../../services/vela.js";

const env = {
  VELA: "true",
  VELA_BUILD_EVENT: "push",
  VELA_BUILD_BRANCH: "my-branch",
  VELA_BUILD_COMMIT: "a1b2c3",
  VELA_BUILD_NUMBER: "25",
  VELA_BUILD_LINK: "https://some-vela-instance.com/Org/Project/25",
  VELA_REPO_FULL_NAME: "Org/Project",
  VELA_BUILD_WORKSPACE: "/home/Org/Project",
};

test("Push", (t) => {
  t.deepEqual(vela.configuration({ env }), {
    name: "Vela",
    service: "vela",
    commit: "a1b2c3",
    tag: undefined,
    build: "25",
    buildUrl: "https://some-vela-instance.com/Org/Project/25",
    branch: "my-branch",
    job: undefined,
    jobUrl: undefined,
    isPr: false,
    pr: undefined,
    prBranch: undefined,
    slug: "Org/Project",
    root: "/home/Org/Project",
  });
});

test("PR", (t) => {
  t.deepEqual(
    vela.configuration({
      env: {
        ...env,
        VELA_BUILD_EVENT: "pull_request",
        VELA_BUILD_PULL_REQUEST: "1",
        VELA_PULL_REQUEST_TARGET: "main",
        VELA_PULL_REQUEST_SOURCE: "my-branch",
        VELA_BUILD_BRANCH: "my-branch",
      },
    }),
    {
      name: "Vela",
      service: "vela",
      commit: "a1b2c3",
      tag: undefined,
      build: "25",
      buildUrl: "https://some-vela-instance.com/Org/Project/25",
      branch: "main",
      job: undefined,
      jobUrl: undefined,
      isPr: true,
      pr: "1",
      prBranch: "my-branch",
      slug: "Org/Project",
      root: "/home/Org/Project",
    },
  );
});

test("Tag", (t) => {
  t.deepEqual(
    vela.configuration({
      env: {
        ...env,
        VELA_BUILD_EVENT: "tag",
        VELA_BUILD_TAG: "v1.0.2",
      },
    }),
    {
      name: "Vela",
      service: "vela",
      commit: "a1b2c3",
      tag: "v1.0.2",
      build: "25",
      buildUrl: "https://some-vela-instance.com/Org/Project/25",
      branch: "my-branch",
      job: undefined,
      jobUrl: undefined,
      isPr: false,
      pr: undefined,
      prBranch: undefined,
      slug: "Org/Project",
      root: "/home/Org/Project",
    },
  );
});
