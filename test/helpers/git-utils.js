import tempy from 'tempy';
import execa from 'execa';

/**
 * Create a git repository and change the current working directory to the repository root.
 *
 * @method gitRepo
 * @param {String} [branch='master'] The branch to initialize.
 * @return {String} The path of the repository otherwise.
 */
export async function gitRepo(branch = 'master') {
	const dir = tempy.directory();

	process.chdir(dir);
	await execa('git', ['init']);
	await execa('git', ['checkout', '-b', branch]);
	return dir;
}

/**
 * Create commit on the current git repository.
 *
 * @param {String} message commit message.
 *
 * @returns {String} The created commit sha.
 */
export async function gitCommit(message = 'Test commit message') {
	await execa('git', ['commit', '-m', message, '--allow-empty', '--no-gpg-sign']);
	return execa.stdout('git', ['rev-parse', 'HEAD']);
}
