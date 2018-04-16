const git = require('./git');

// https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

module.exports = {
	detect() {
		return Boolean(process.env.CODEBUILD_BUILD_ID);
	},
	configuration() {
		return {
			name: 'AWS CodeBuild',
			service: 'codebuild',
			commit: git.head(),
			build: process.env.CODEBUILD_BUILD_ID,
			branch: git.branch(),
			buildUrl: `https://console.aws.amazon.com/codebuild/home?region=${process.env.AWS_REGION}#/builds/${
				process.env.CODEBUILD_BUILD_ID
			}/view/new`,
			root: process.env.PWD,
		};
	},
};
