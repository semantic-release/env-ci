// https://readme.drone.io/reference/environ

module.exports = {
	detect({env}) {
		return Boolean(env.DRONE);
	},
	configuration({env}) {
		return {
			name: 'Drone',
			service: 'drone',
			commit: env.DRONE_COMMIT_SHA,
			tag: env.DRONE_TAG,
			build: env.DRONE_BUILD_NUMBER,
			branch: env.DRONE_BRANCH,
			job: env.DRONE_JOB_NUMBER,
			pr: env.DRONE_PULL_REQUEST,
			isPr: env.DRONE_BUILD_EVENT === 'pull_request',
			slug: `${env.DRONE_REPO_OWNER}/${env.DRONE_REPO_NAME}`,
		};
	},
};
