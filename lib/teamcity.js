// https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters

const javaProperties = require('java-properties');

function getProperties(env) {
	const file = env.TEAMCITY_BUILD_PROPERTIES_FILE;
	if (!file) {
		return {};
	}
	const properties = javaProperties.of(file);
	return {
		root: properties.get('teamcity.build.workingDir'),
		branch: properties.get('teamcity.build.branch'),
	};
}

module.exports = {
	detect() {
		return Boolean(process.env.TEAMCITY_VERSION);
	},
	configuration() {
		return Object.assign(
			{
				name: 'TeamCity',
				service: 'teamcity',
				commit: process.env.BUILD_VCS_NUMBER,
				build: process.env.BUILD_NUMBER,
				slug: process.env.TEAMCITY_BUILDCONF_NAME,
			},
			getProperties(process.env)
		);
	},
};
