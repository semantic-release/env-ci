'use strict';

const process = require('process'); // eslint-disable-line node/prefer-global/process
const git = require('./services/git');

const services = {
  appveyor: require('./services/appveyor'),
  bamboo: require('./services/bamboo'),
  bitbucket: require('./services/bitbucket'),
  bitrise: require('./services/bitrise'),
  buddy: require('./services/buddy'),
  buildkite: require('./services/buildkite'),
  circleci: require('./services/circleci'),
  cirrus: require('./services/cirrus'),
  codebuild: require('./services/codebuild'),
  codefresh: require('./services/codefresh'),
  codeship: require('./services/codeship'),
  drone: require('./services/drone'),
  github: require('./services/github'),
  gitlab: require('./services/gitlab'),
  jenkins: require('./services/jenkins'),
  netlify: require('./services/netlify'),
  puppet: require('./services/puppet'),
  sail: require('./services/sail'),
  scrutinizer: require('./services/scrutinizer'),
  semaphore: require('./services/semaphore'),
  shippable: require('./services/shippable'),
  teamcity: require('./services/teamcity'),
  travis: require('./services/travis'),
  vercel: require('./services/vercel'),
  vsts: require('./services/vsts'),
  wercker: require('./services/wercker'),
};

module.exports = ({env = process.env, cwd = process.cwd()} = {}) => {
  for (const name of Object.keys(services)) {
    if (services[name].detect({env, cwd})) {
      return {isCi: true, ...services[name].configuration({env, cwd})};
    }
  }

  return {isCi: Boolean(env.CI), ...git.configuration({env, cwd})};
};
