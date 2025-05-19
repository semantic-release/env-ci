import test from "ava";
import git from "../../services/git.js";
import { gitRepo, gitCommit } from "../helpers/git-utils.js";

test('Return "commit" and "branch" from local repository', async (t) => {
  const { cwd } = await gitRepo();
  const commit = await gitCommit("Test commit message", { cwd });

  t.deepEqual(git.configuration({ cwd }), { commit, branch: "master" });
});
