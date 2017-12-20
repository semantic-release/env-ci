'use strict';

const git = require('./lib/git');

const services = {
  travis: require('./lib/travis'),
  circle: require('./lib/circle'),
  appveyor: require('./lib/appveyor'),
  wercker: require('./lib/wercker'),
  codeship: require('./lib/codeship'),
  jenkins: require('./lib/jenkins'),
  semaphore: require('./lib/semaphore'),
  shippable: require('./lib/shippable'),
  drone: require('./lib/drone'),
  buildkite: require('./lib/buildkite'),
  gitlab: require('./lib/gitlab'),
};

module.exports = () => {
  for (const name of Object.keys(services)) {
    if (services[name].detect()) {
      return Object.assign({isCi: true}, services[name].configuration());
    }
  }
  return Object.assign({isCi: Boolean(process.env.CI)}, git.configuration());
};
