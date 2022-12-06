import test from "ava";
import scrutinizer from "../../services/scrutinizer.js";

const env = {
  SCRUTINIZER: "true",
  SCRUTINIZER_SHA1: "5678",
  SCRUTINIZER_INSPECTION_UUID: "91011",
  SCRUTINIZER_BRANCH: "master",
};

test("Push", (t) => {
  t.deepEqual(scrutinizer.configuration({ env }), {
    name: "Scrutinizer",
    service: "scrutinizer",
    commit: "5678",
    build: "91011",
    branch: "master",
    pr: undefined,
    isPr: false,
    prBranch: undefined,
  });
});

test("PR", (t) => {
  t.deepEqual(
    scrutinizer.configuration({
      env: {
        ...env,
        SCRUTINIZER_PR_NUMBER: "10",
        SCRUTINIZER_PR_SOURCE_BRANCH: "pr-branch",
      },
    }),
    {
      name: "Scrutinizer",
      service: "scrutinizer",
      commit: "5678",
      build: "91011",
      branch: "master",
      pr: "10",
      isPr: true,
      prBranch: "pr-branch",
    }
  );
});
