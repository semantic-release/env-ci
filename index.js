'use strict';

const git = require('./lib/git');

const services = {
	appveyor: require('./lib/appveyor'),
	bamboo: require('./lib/bamboo'),
	bitbucket: require('./lib/bitbucket'),
	bitrise: require('./lib/bitrise'),
	buildkite: require('./lib/buildkite'),
	circleci: require('./lib/circleci'),
	codebuild: require('./lib/codebuild'),
	codeship: require('./lib/codeship'),
	drone: require('./lib/drone'),
	gitlab: require('./lib/gitlab'),
	jenkins: require('./lib/jenkins'),
	semaphore: require('./lib/semaphore'),
	shippable: require('./lib/shippable'),
	teamcity: require('./lib/teamcity'),
	travis: require('./lib/travis'),
	wercker: require('./lib/wercker'),
};

module.exports = () => {
	for (const name of Object.keys(services)) {
		if (services[name].detect()) {
			return Object.assign({isCi: true}, services[name].configuration());
		}
	}
	return Object.assign({isCi: Boolean(process.env.CI)}, git.configuration());
};
