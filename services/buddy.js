// https://buddy.works/docs/pipelines/environment-variables#default-environment-variables

import { prNumber } from "../lib/utils.js";

export default {
  detect({ env }) {
    return Boolean(env.BUDDY_WORKSPACE_ID);
  },
  configuration({ env }) {
    const pr = prNumber(env.BUDDY_EXECUTION_PULL_REQUEST_ID);
    const isPr = Boolean(pr);
    const branch = isPr ? env.BUDDY_EXECUTION_PULL_REQUEST_HEAD_BRANCH : env.BUDDY_EXECUTION_BRANCH;

    return {
      name: "Buddy",
      service: "buddy",
      commit: env.BUDDY_EXECUTION_REVISION,
      tag: env.BUDDY_EXECUTION_TAG,
      build: env.BUDDY_EXECUTION_ID,
      buildUrl: env.BUDDY_EXECUTION_URL,
      branch,
      prBranch: isPr ? branch : undefined,
      pr,
      isPr,
      slug: env.BUDDY_REPO_SLUG,
    };
  },
};