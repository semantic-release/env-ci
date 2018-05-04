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
		const headRef = execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout;

		if (headRef === 'HEAD') {
			const branch = execa
				.sync('git', ['show', '-s', '--pretty=%d', 'HEAD'])
				.stdout.replace(/^\(|\)$/g, '')
				.split(', ')
				.find(branch => branch.startsWith('origin/'));
			return branch ? branch.match(/^origin\/(.+)/)[1] : undefined;
		}
		return headRef;
	} catch (err) {
		return undefined;
	}
}

module.exports = {configuration, head, branch};
