import test from 'ava';
import cloudbuild from '../../services/cloudbuild';
import {gitRepo} from '../helpers/git-utils';

const env = {
	BUILD_ID: 'arbitary-build-id',
	BRANCH_NAME: 'arbitary-branch',
	COMMIT_SHA: 'arbitary-commit-sha',
	TAG_NAME: 'arbitary-tag-name',
	REPO_NAME: 'https://github.com/arbitary-repo-slug',
};

test('Push', async t => {
	const {cwd} = await gitRepo(true);

	t.deepEqual(cloudbuild.configuration({env, cwd}), {
		name: 'Google Cloud Build',
		service: 'cloudbuild',
		commit: 'arbitary-commit-sha',
		build: 'arbitary-build-id',
		branch: 'arbitary-branch',
		buildUrl: 'https://console.cloud.google.com/cloud-build/builds/arbitary-build-id',
		slug: 'https://github.com/arbitary-repo-slug',
		tag: 'arbitary-tag-name',
	});
});
