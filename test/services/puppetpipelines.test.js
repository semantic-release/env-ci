import test from 'ava';
import puppetpipelines from '../../services/puppetpipelines';

const env = {
	DISTELLI_BUILDNUM: '1234',
	DISTELLI_RELEASE: 'https://server.com/buildresult',
	DISTELLI_RELREVISION: '5678',
	DISTELLI_RELBRANCH: 'master',
	DISTELLI_INSTALLHOME: '/opt/distelli',
};

test('Push', t => {
	t.deepEqual(puppetpipelines.configuration({env}), {
		name: 'Puppet Pipelines (formerly Distelli)',
		service: 'puppetpipelines',
		build: '1234',
		buildUrl: 'https://server.com/buildresult',
		commit: '5678',
		branch: 'master',
		root: '/opt/distelli',
	});
});
