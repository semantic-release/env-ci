'use strict';

const process = require('process');
const git = require('./lib/git');

const services = {
	appveyor: require('./lib/appveyor'),
	bamboo: require('./lib/bamboo'),
	bitbucket: require('./lib/bitbucket'),
	bitrise: require('./lib/bitrise'),
	buddy: require('./lib/buddy'),
	buildkite: require('./lib/buildkite'),
	circleci: require('./lib/circleci'),
	cirrus: require('./lib/cirrus'),
	codebuild: require('./lib/codebuild'),
	codeship: require('./lib/codeship'),
	drone: require('./lib/drone'),
	gitlab: require('./lib/gitlab'),
	jenkins: require('./lib/jenkins'),
	sail: require('./lib/sail'),
	semaphore: require('./lib/semaphore'),
	shippable: require('./lib/shippable'),
	teamcity: require('./lib/teamcity'),
	travis: require('./lib/travis'),
	vsts: require('./lib/vsts'),
	wercker: require('./lib/wercker'),
};

module.exports = ({env = process.env, cwd = process.cwd()} = {}) => {
	for (const name of Object.keys(services)) {
		if (services[name].detect({env, cwd})) {
			return Object.assign({isCi: true}, services[name].configuration({env, cwd}));
		}
	}
	return Object.assign({isCi: Boolean(env.CI)}, git.configuration({env, cwd}));
};
