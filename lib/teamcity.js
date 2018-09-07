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
