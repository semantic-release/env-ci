import test from "ava";
import { getSlugFromGitURL, head, branch } from "../../lib/git.js";
import {
  gitRepo,
  gitCommit,
  gitHead,
  gitCheckout,
} from "../helpers/git-utils.js";

test("Git local repository", async (t) => {
  const { cwd } = await gitRepo();
  const commit = await gitCommit("Test commit message", { cwd });

  t.is(head({ cwd }), commit);
  t.is(branch({ cwd }), "master");
});

test("Git cloned repository", async (t) => {
  const { cwd } = await gitRepo(true);

  t.is(head({ cwd }), await gitHead({ cwd }));
  t.is(branch({ cwd }), "master");
});

test("Git local repository with detached head", async (t) => {
  const { cwd } = await gitRepo();
  const commit = await gitCommit("Test commit message", { cwd });
  await gitCheckout("HEAD~0", false, { cwd });

  t.is(head({ cwd }), commit);
  t.is(branch({ cwd }), undefined);
});

test("Git cloned repository with detached head", async (t) => {
  const { cwd } = await gitRepo(true);
  await gitCheckout("HEAD~0", false, { cwd });

  t.is(head({ cwd }), await gitHead({ cwd }));
  t.is(branch({ cwd }), "master");
});

test("Slug from git URL", (t) => {
  t.is(getSlugFromGitURL(""), undefined);
  t.is(getSlugFromGitURL("invalid url"), undefined);
  t.is(getSlugFromGitURL("https://github.com/owner/repo.git"), "owner/repo");
  t.is(getSlugFromGitURL("git@github.com:owner/repo.git"), "owner/repo");
  t.is(getSlugFromGitURL("user@host.com:9418/owner/repo.git"), "owner/repo");
  t.is(getSlugFromGitURL("user@192.169.0.1:9418/owner/repo.git"), "owner/repo");
});
