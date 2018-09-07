// https://docs.microsoft.com/en-us/vsts/pipelines/build/variables

module.exports = {
	detect({env}) {
		return Boolean(env.BUILD_BUILDURI);
	},
	configuration({env}) {
		return {
			name: 'Visual Studio Team Services',
			service: 'vsts',
			commit: env.BUILD_SOURCEVERSION,
			build: env.BUILD_BUILDNUMBER,
			branch: env.BUILD_SOURCEBRANCHNAME,
			pr: env.SYSTEM_PULLREQUEST_PULLREQUESTID,
			isPr: Boolean(env.SYSTEM_PULLREQUEST_PULLREQUESTID && env.SYSTEM_PULLREQUEST_PULLREQUESTID !== 'false'),
			root: env.BUILD_REPOSITORY_LOCALPATH,
		};
	},
};
