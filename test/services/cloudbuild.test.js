import test from 'ava';
import cloudbuild from '../../services/cloudbuild';

const env = {
	PROJECT_ID: 'ProjectId',
	BUILD_ID: 'BuildId',
	COMMIT_SHA: 'Commit SHA',
	SHORT_SHA: 'Short SHA',
	REPO_NAME: 'Repo name',
	BRANCH_NAME: 'Branch name',
	TAG_NAME: 'Tag name',
};

test('Push', t => {
	t.deepEqual(cloudbuild.configuration({env}), {
		name: 'Google Cloud Builder',
		service: 'cloudbuild',
		build: env.BUILD_ID,
		buildUrl: `https://console.cloud.google.com/cloud-build/builds/${env.BUILD_ID}`,
		commit: env.COMMIT_SHA,
		tag: env.TAG_NAME,
		branch: env.BRANCH_NAME,
		slug: env.REPO_NAME,
		root: '/workspace',
	});
});
