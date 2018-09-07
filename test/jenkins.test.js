import test from 'ava';
import jenkins from '../lib/jenkins';

const env = {
	JENKINS_URL: 'http://jenkins.jenkins.example/',
	GIT_COMMIT: '5678',
	BUILD_NUMBER: '91011',
	BUILD_URL: 'http://jenkins.jenkins.example/buildResult',
	WORKSPACE: '/',
};

test('Push', t => {
	t.deepEqual(jenkins.configuration({env: Object.assign({}, env, {GIT_BRANCH: 'master'})}), {
		name: 'Jenkins',
		service: 'jenkins',
		commit: '5678',
		build: '91011',
		buildUrl: 'http://jenkins.jenkins.example/buildResult',
		branch: 'master',
		root: '/',
		pr: undefined,
		isPr: false,
	});
});

test('PR', t => {
	t.deepEqual(jenkins.configuration({env: Object.assign({}, env, {BRANCH_NAME: 'pr_branch', CHANGE_ID: '10'})}), {
		name: 'Jenkins',
		service: 'jenkins',
		commit: '5678',
		build: '91011',
		buildUrl: 'http://jenkins.jenkins.example/buildResult',
		branch: 'pr_branch',
		root: '/',
		pr: '10',
		isPr: true,
	});
});

test('PR (PR builder)', t => {
	t.deepEqual(
		jenkins.configuration({env: Object.assign({}, env, {ghprbSourceBranch: 'pr_branch', ghprbPullId: '10'})}),
		{
			name: 'Jenkins',
			service: 'jenkins',
			commit: '5678',
			build: '91011',
			buildUrl: 'http://jenkins.jenkins.example/buildResult',
			branch: 'pr_branch',
			root: '/',
			pr: '10',
			isPr: true,
		}
	);
});
