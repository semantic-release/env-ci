// https://go-vela.github.io/docs/concepts/pipeline/steps/environment/#defaults

module.exports = {
  detect({env}) {
    return Boolean(env.VELA);
  },
  configuration({env}) {
    const isPr = env.BUILD_EVENT === 'pull_request';

    return {
      name: 'Vela',
      service: 'vela',
      branch: env.BUILD_BRANCH,
      commit: env.BUILD_COMMIT,
      tag: env.BUILD_TAG,
      build: env.BUILD_NUMBER,
      buildUrl: env.BUILD_LINK,
      isPr,
      pr: env.BUILD_PULL_REQUEST_NUMBER,
      slug: env.REPOSITORY_FULL_NAME,
      root: env.BUILD_WORKSPACE,
    };
  },
};
