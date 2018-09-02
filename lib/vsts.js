// https://docs.microsoft.com/en-us/vsts/pipelines/build/variables

module.exports = {
	detect() {
		return Boolean(process.env.BUILD_BUILDURI);
	},
	configuration() {
		return {
			name: 'Visual Studio Team Services',
			service: 'vsts',
			commit: process.env.BUILD_SOURCEVERSION,
			build: process.env.BUILD_BUILDNUMBER,
			branch: process.env.BUILD_SOURCEBRANCHNAME,
			pr: process.env.SYSTEM_PULLREQUEST_PULLREQUESTID,
			isPr: Boolean(
				process.env.SYSTEM_PULLREQUEST_PULLREQUESTID && process.env.SYSTEM_PULLREQUEST_PULLREQUESTID !== 'false'
			),
			root: process.env.BUILD_REPOSITORY_LOCALPATH,
		};
	},
};
