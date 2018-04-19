import tempy from 'tempy';
import execa from 'execa';
import fileUrl from 'file-url';

/**
 * Create a temporary git repository.
 * If `withRemote` is `true`, creates a bare repository, initialize it and create a shallow clone. Change the current working directory to the clone root.
 * If `withRemote` is `false`, creates a regular repository and initialize it. Change the current working directory to the repository root.
 *
 * @param {Boolean} withRemote `true` to create a shallow clone of a bare repository.
 * @param {String} [branc='master'] The branch to initialize.
 * @return {String} The path of the clone if `withRemote` is `true`, the path of the repository otherwise.
 */
export async function gitRepo(withRemote, branch = 'master') {
	const dir = tempy.directory();

	process.chdir(dir);
	await execa('git', ['init'].concat(withRemote ? ['--bare'] : []));

	if (withRemote) {
		await initBareRepo(fileUrl(dir), branch);
		await gitShallowClone(fileUrl(dir));
	} else {
		await gitCheckout(branch);
	}
	return fileUrl(dir);
}

/**
 * Initialize an existing bare repository:
 * - Clone the repository
 * - Change the current working directory to the clone root
 * - Create a default branch
 * - Create an initial commits
 * - Push to origin
 *
 * @param {String} origin The URL of the bare repository.
 * @param {String} [branch='master'] the branch to initialize.
 */
export async function initBareRepo(origin, branch = 'master') {
	const clone = tempy.directory();
	await execa('git', ['clone', '--no-hardlinks', origin, clone]);
	process.chdir(clone);
	await gitCheckout(branch);
	await gitCommit('Initial commit');
	await execa('git', ['push', origin, branch]);
}

/**
 * Create a shallow clone of a git repository and change the current working directory to the cloned repository root.
 * The shallow will contain a limited number of commit and no tags.
 *
 * @param {String} origin The path of the repository to clone.
 * @param {Number} [depth=1] The number of commit to clone.
 * @return {String} The path of the cloned repository.
 */
export async function gitShallowClone(origin, branch = 'master', depth = 1) {
	const dir = tempy.directory();

	process.chdir(dir);
	await execa('git', ['clone', '--no-hardlinks', '--no-tags', '-b', branch, '--depth', depth, origin, dir]);
	return dir;
}

/**
 * Checkout a branch on the current git repository.
 *
 * @param {String} branch Branch name.
 * @param {boolean} create `true` to create the branche ans switch, `false` to only switch.
 */
export async function gitCheckout(branch, create = true) {
	await execa('git', create ? ['checkout', '-b', branch] : ['checkout', branch]);
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

/**
 * @return {String} The sha of the head commit in the current git repository.
 */
export async function gitHead() {
	return execa.stdout('git', ['rev-parse', 'HEAD']);
}
