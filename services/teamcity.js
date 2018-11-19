// https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters

const javaProperties = require('java-properties');

const PROPERTIES_MAPPING = {root: 'teamcity.build.workingDir', branch: 'teamcity.build.branch'};

const getProperties = env => {
	const properties = env.TEAMCITY_BUILD_PROPERTIES_FILE
		? javaProperties.of(env.TEAMCITY_BUILD_PROPERTIES_FILE)
		: undefined;

	return Object.keys(PROPERTIES_MAPPING).reduce((result, key) => {
		const property = properties ? properties.get(PROPERTIES_MAPPING[key]) : undefined;
		return Object.assign(result, {[key]: typeof property === 'undefined' ? env[PROPERTIES_MAPPING[key]] : property});
	}, {});
};

module.exports = {
	detect({env}) {
		return Boolean(env.TEAMCITY_VERSION);
	},
	configuration({env}) {
		return Object.assign(
			{
				name: 'TeamCity',
				service: 'teamcity',
				commit: env.BUILD_VCS_NUMBER,
				build: env.BUILD_NUMBER,
				slug: env.TEAMCITY_BUILDCONF_NAME,
			},
			getProperties(env)
		);
	},
};
