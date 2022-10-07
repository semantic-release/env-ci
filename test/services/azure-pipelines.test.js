import test from "ava";
import azurePipelines from "../../services/azure-pipelines.js";

const env = {
  BUILD_BUILDURI: "https://fabrikamfiber.visualstudio.com/_git/Scripts",
  BUILD_SOURCEVERSION: "5678",
  BUILD_BUILDNUMBER: "1234",
  BUILD_SOURCEBRANCH: "master",
  BUILD_REPOSITORY_LOCALPATH: "/",
};

test("Push", (t) => {
  t.deepEqual(azurePipelines.configuration({ env }), {
    name: "Azure Pipelines",
    service: "azurePipelines",
    commit: "5678",
    build: "1234",
    branch: "master",
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    root: "/",
  });
});

test("Push - with long branch name", (t) => {
  t.deepEqual(
    azurePipelines.configuration({
      env: { ...env, BUILD_SOURCEBRANCH: "refs/heads/master" },
    }),
    {
      name: "Azure Pipelines",
      service: "azurePipelines",
      commit: "5678",
      build: "1234",
      branch: "master",
      pr: undefined,
      isPr: false,
      prBranch: undefined,
      root: "/",
    }
  );
});

test("PR", (t) => {
  t.deepEqual(
    azurePipelines.configuration({
      env: {
        ...env,
        SYSTEM_PULLREQUEST_PULLREQUESTID: "9",
        SYSTEM_PULLREQUEST_TARGETBRANCH: "master",
        SYSTEM_PULLREQUEST_SOURCEBRANCH: "pr-branch",
      },
    }),
    {
      name: "Azure Pipelines",
      service: "azurePipelines",
      commit: "5678",
      build: "1234",
      branch: "master",
      pr: "9",
      isPr: true,
      prBranch: "pr-branch",
      root: "/",
    }
  );
});
