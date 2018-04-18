const execa = require('execa');
const git = require('./git');

// https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

function branchForHEAD() {
	try {
		const branches = execa.sync('git', ['branch', '-a', '--contains', 'HEAD']).stdout;
		return branches.split('\n')[1];
	} catch (err) {
		return undefined;
	}
}

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
			branch: branchForHEAD(),
			buildUrl: `https://console.aws.amazon.com/codebuild/home?region=${process.env.AWS_REGION}#/builds/${
				process.env.CODEBUILD_BUILD_ID
			}/view/new`,
			root: process.env.PWD,
		};
	},
};
