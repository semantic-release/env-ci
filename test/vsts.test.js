import test from 'ava';
import circle from '../lib/vsts';

test('Push', t => {
	process.env.BUILD_BUILDURI = 'https://fabrikamfiber.visualstudio.com/_git/Scripts';
	process.env.BUILD_SOURCEVERSION = '5678';
	process.env.BUILD_BUILDNUMBER = '1234';
	process.env.BUILD_SOURCEBRANCHNAME = 'master';
	process.env.BUILD_REPOSITORY_LOCALPATH = '/';
	delete process.env.SYSTEM_PULLREQUEST_PULLREQUESTID;

	t.deepEqual(circle.configuration(), {
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
	process.env.BUILD_BUILDURI = 'https://fabrikamfiber.visualstudio.com/_git/Scripts';
	process.env.BUILD_SOURCEVERSION = '5678';
	process.env.BUILD_BUILDNUMBER = '1234';
	process.env.BUILD_SOURCEBRANCHNAME = 'master';
	process.env.BUILD_REPOSITORY_LOCALPATH = '/';
	process.env.SYSTEM_PULLREQUEST_PULLREQUESTID = '9';

	t.deepEqual(circle.configuration(), {
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
