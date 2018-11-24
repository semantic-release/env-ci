// https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters

const javaProperties = require('java-properties');

const PROPERTIES_MAPPING = {root: 'teamcity.build.workingDir', branch: 'teamcity.build.branch'};

const getProperties = env => {
	const buildProperties = env.TEAMCITY_BUILD_PROPERTIES_FILE
		? javaProperties.of(env.TEAMCITY_BUILD_PROPERTIES_FILE)
		: undefined;
	const configFile = buildProperties ? buildProperties.get('teamcity.configuration.properties.file') : undefined;
	const configProperties = configFile ? javaProperties.of(configFile) : configFile;

	return Object.keys(PROPERTIES_MAPPING).reduce(
		(result, key) =>
			Object.assign(result, {
				[key]:
					(buildProperties ? buildProperties.get(PROPERTIES_MAPPING[key]) : undefined) ||
					(configProperties ? configProperties.get(PROPERTIES_MAPPING[key]) : undefined),
			}),
		{}
	);
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
