// https://docs.netlify.com/configure-builds/environment-variables/#git-metadata

module.exports = {
  detect({env}) {
    return env.NETLIFY === 'true';
  },
  configuration({env}) {
    const isPr = env.PULL_REQUEST === 'true';

    return {
      name: 'Netlify',
      service: 'netlify',
      commit: env.COMMIT_REF,
      branch: env.HEAD,
      build: env.DEPLOY_ID,
      buildUrl: `https://app.netlify.com/sites/${env.SITE_NAME}/deploys/${env.DEPLOY_ID}`,
      pr: env.REVIEW_ID,
      isPr,
    };
  },
};
