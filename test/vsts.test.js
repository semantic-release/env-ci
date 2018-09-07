import test from 'ava';
import vsts from '../lib/vsts';

const env = {
	BUILD_BUILDURI: 'https://fabrikamfiber.visualstudio.com/_git/Scripts',
	BUILD_SOURCEVERSION: '5678',
	BUILD_BUILDNUMBER: '1234',
	BUILD_SOURCEBRANCHNAME: 'master',
	BUILD_REPOSITORY_LOCALPATH: '/',
};

test('Push', t => {
	t.deepEqual(vsts.configuration({env}), {
		name: 'Visual Studio Team Services',
		service: 'vsts',
		commit: '5678',
		build: '1234',
		branch: 'master',
		pr: undefined,
		isPr: false,
		root: '/',
	});
});

test('PR', t => {
	t.deepEqual(vsts.configuration({env: Object.assign({}, env, {SYSTEM_PULLREQUEST_PULLREQUESTID: '9'})}), {
		name: 'Visual Studio Team Services',
		service: 'vsts',
		commit: '5678',
		build: '1234',
		branch: 'master',
		pr: '9',
		isPr: true,
		root: '/',
	});
});
