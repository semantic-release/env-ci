// https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html

module.exports = {
  detect({env}) {
    return Boolean(env.AWS_APP_ID);
  },
  configuration({env}) {
    return {
      name: 'AWS Amplify',
      service: 'amplify',
      commit: env.AWS_COMMIT_ID,
      build: env.CODEBUILD_BUILD_ID,
      branch: env.AWS_BRANCH,
      buildUrl: env.CODEBUILD_BUILD_URL,
      root: env.PWD,
    };
  },
};
