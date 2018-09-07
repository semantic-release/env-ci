import test from 'ava';
import gitlab from '../lib/gitlab';

const env = {
	GITLAB_CI: 'true',
	CI_COMMIT_SHA: '5678',
	CI_PIPELINE_ID: '91011',
	CI_JOB_ID: '1213',
	CI_PROJECT_URL: 'https://gitlab.com/owner/repo',
	CI_COMMIT_REF_NAME: 'master',
	CI_PROJECT_PATH: 'owner/repo',
	CI_PROJECT_DIR: '/',
};

test('Push', t => {
	t.deepEqual(gitlab.configuration({env}), {
		name: 'GitLab CI/CD',
		service: 'gitlab',
		commit: '5678',
		build: '91011',
		buildUrl: 'https://gitlab.com/owner/repo/pipelines/91011',
		branch: 'master',
		root: '/',
		job: '1213',
		jobUrl: 'https://gitlab.com/owner/repo/-/jobs/1213',
		slug: 'owner/repo',
	});
});
