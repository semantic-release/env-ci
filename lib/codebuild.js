// https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html
// https://gist.github.com/coderbyheart/7b64b9f39a703001c0d883d092afa640

const {branch} = require('./git');

const gh = /^https?:\/\/github.com\//i;
function slug(sourceRepoUrl) {
	if (gh.test(sourceRepoUrl)) {
		const [owner, repo] = sourceRepoUrl.replace(gh, '').split('/', 2);
		return `${owner}/${repo.replace(/\.git$/, '')}`;
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
			commit: process.env.CODEBUILD_SOURCE_VERSION,
			build: process.env.CODEBUILD_BUILD_ID,
			buildUrl: `https://console.aws.amazon.com/codebuild/home?region=${process.env.AWS_REGION}#/builds/${
				process.env.CODEBUILD_BUILD_ID
			}/view/new`,
			branch: branch(),
			pr: undefined,
			isPr: false,
			slug: slug(process.env.CODEBUILD_SOURCE_REPO_URL),
			root: process.env.PWD,
		};
	},
};
