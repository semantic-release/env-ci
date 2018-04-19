const execa = require('execa');

function configuration() {
	return {
		commit: head(),
		branch: branch(),
	};
}

function head() {
	try {
		return execa.sync('git', ['rev-parse', 'HEAD']).stdout;
	} catch (err) {
		return undefined;
	}
}

function branch() {
	try {
		const branch = execa
			.sync('git', ['show', '-s', '--pretty=%d', 'HEAD'])
			.stdout.match(/\(?(.*)\)?/)[1]
			.split(', ')
			.find(branch => branch.startsWith('origin/'));

		return branch ? branch.match(/^origin\/(.+)/)[1] : execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout;
	} catch (err) {
		return undefined;
	}
}

module.exports = {configuration, head, branch};
