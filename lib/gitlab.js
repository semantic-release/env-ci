// https://docs.gitlab.com/ce/ci/variables/README.html

module.exports = {
	detect() {
		return Boolean(process.env.GITLAB_CI);
	},
	configuration() {
		return {
			name: 'GitLab CI/CD',
			service: 'gitlab',
			commit: process.env.CI_COMMIT_SHA,
			build: process.env.CI_PIPELINE_ID,
			buildUrl: `${process.env.CI_PROJECT_URL}/pipelines/${process.env.CI_PIPELINE_ID}`,
			job: process.env.CI_JOB_ID,
			jobUrl: `${process.env.CI_PROJECT_URL}/-/jobs/${process.env.CI_JOB_ID}`,
			branch: process.env.CI_COMMIT_REF_NAME,
			slug: process.env.CI_PROJECT_PATH,
			root: process.env.CI_PROJECT_DIR,
		};
	},
};
