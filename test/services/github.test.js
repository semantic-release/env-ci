import fs from 'fs';
import test from 'ava';
import tempy from 'tempy';
import github from '../../services/github';

/* eslint camelcase: ["error", {properties: "never"}] */

const env = {
	GITHUB_ACTION: 'action-name',
	GITHUB_SHA: '1234',
	GITHUB_REF: '/refs/heads/master',
	GITHUB_REPOSITORY: 'owner/repo',
	GITHUB_WORKSPACE: '/workspace',
};

test('Push', t => {
	t.deepEqual(github.configuration({env}), {
		name: 'GitHub Actions',
		service: 'github',
		commit: '1234',
		branch: 'master',
		isPr: false,
		prBranch: undefined,
		root: '/workspace',
		slug: 'owner/repo',
	});
});

test('PR - with event.json file', t => {
	const eventFile = tempy.file({extension: 'json'});
	const event = {pull_request: {number: '10', base: {ref: '/refs/heads/master'}}};
	fs.writeFileSync(eventFile, JSON.stringify(event));

	t.deepEqual(
		github.configuration({
			env: Object.assign({}, env, {
				GITHUB_EVENT_NAME: 'pull_request',
				GITHUB_REF: '/refs/heads/pr-branch',
				GITHUB_EVENT_PATH: eventFile,
			}),
		}),
		{
			name: 'GitHub Actions',
			service: 'github',
			commit: '1234',
			branch: 'master',
			isPr: true,
			prBranch: 'pr-branch',
			pr: '10',
			root: '/workspace',
			slug: 'owner/repo',
		}
	);
});

test('PR - with missing event.json file', t => {
	t.deepEqual(
		github.configuration({
			env: Object.assign({}, env, {
				GITHUB_EVENT_NAME: 'pull_request',
				GITHUB_REF: '/refs/heads/pr-branch',
				GITHUB_EVENT_PATH: '/tmp/null',
			}),
		}),
		{
			name: 'GitHub Actions',
			service: 'github',
			commit: '1234',
			branch: undefined,
			isPr: true,
			prBranch: 'pr-branch',
			pr: undefined,
			root: '/workspace',
			slug: 'owner/repo',
		}
	);
});

test('PR - with missing event.json file path', t => {
	t.deepEqual(
		github.configuration({
			env: Object.assign({}, env, {
				GITHUB_EVENT_NAME: 'pull_request',
				GITHUB_REF: '/refs/heads/pr-branch',
			}),
		}),
		{
			name: 'GitHub Actions',
			service: 'github',
			commit: '1234',
			branch: undefined,
			isPr: true,
			prBranch: 'pr-branch',
			pr: undefined,
			root: '/workspace',
			slug: 'owner/repo',
		}
	);
});

test('PR - with missing "pull_request" in event.json file', t => {
	const eventFile = tempy.file({extension: 'json'});
	const event = {};
	fs.writeFileSync(eventFile, JSON.stringify(event));

	t.deepEqual(
		github.configuration({
			env: Object.assign({}, env, {
				GITHUB_EVENT_NAME: 'pull_request',
				GITHUB_REF: '/refs/heads/pr-branch',
				GITHUB_EVENT_PATH: eventFile,
			}),
		}),
		{
			name: 'GitHub Actions',
			service: 'github',
			commit: '1234',
			branch: undefined,
			isPr: true,
			prBranch: 'pr-branch',
			pr: undefined,
			root: '/workspace',
			slug: 'owner/repo',
		}
	);
});

test('PR - with missing "pull_request.base" in event.json file', t => {
	const eventFile = tempy.file({extension: 'json'});
	const event = {pull_request: {number: '10'}};
	fs.writeFileSync(eventFile, JSON.stringify(event));

	t.deepEqual(
		github.configuration({
			env: Object.assign({}, env, {
				GITHUB_EVENT_NAME: 'pull_request',
				GITHUB_REF: '/refs/heads/pr-branch',
				GITHUB_EVENT_PATH: eventFile,
			}),
		}),
		{
			name: 'GitHub Actions',
			service: 'github',
			commit: '1234',
			branch: undefined,
			isPr: true,
			prBranch: 'pr-branch',
			pr: '10',
			root: '/workspace',
			slug: 'owner/repo',
		}
	);
});

test('PR - with erronous branch names', t => {
	const eventFile = tempy.file({extension: 'json'});
	const event = {pull_request: {number: '10', base: {ref: '/refs/tags/master'}}};
	fs.writeFileSync(eventFile, JSON.stringify(event));

	t.deepEqual(
		github.configuration({
			env: Object.assign({}, env, {
				GITHUB_EVENT_NAME: 'pull_request',
				GITHUB_REF: '/refs/tags/pr-branch',
				GITHUB_EVENT_PATH: eventFile,
			}),
		}),
		{
			name: 'GitHub Actions',
			service: 'github',
			commit: '1234',
			branch: undefined,
			isPr: true,
			prBranch: undefined,
			pr: '10',
			root: '/workspace',
			slug: 'owner/repo',
		}
	);
});
