import test from "ava";
import jetbrainsSpace from "../../services/jetbrains-space.js";

const env = {
  JB_SPACE_PROJECT_ID: "1",
  JB_SPACE_PROJECT_KEY: "TEST-PROJECT",
  JB_SPACE_EXECUTION_NUMBER: "123",
  JB_SPACE_GIT_REVISION: "12345",
  JB_SPACE_GIT_BRANCH: "refs/heads/some_branch",
  JB_SPACE_GIT_REPOSITORY_NAME: "test-repository",
};

test("Push", (t) => {
  t.deepEqual(jetbrainsSpace.configuration({ env }), {
    name: "JetBrains Space",
    service: "jetbrainsSpace",
    commit: "12345",
    build: "123",
    branch: "some_branch",
    slug: "test-project/test-repository",
  });
});
