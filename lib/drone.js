// http://readme.drone.io/0.5/usage/environment-reference

module.exports = {
	detect() {
		return Boolean(process.env.DRONE);
	},
	configuration() {
		return {
			name: 'Drone',
			service: 'drone',
			commit: process.env.DRONE_COMMIT_SHA,
			build: process.env.DRONE_BUILD_NUMBER,
			branch: process.env.DRONE_BRANCH,
			job: process.env.DRONE_JOB_NUMBER,
			pr: process.env.DRONE_PULL_REQUEST,
			isPr: process.env.DRONE_BUILD_EVENT === 'pull_request',
			slug: `${process.env.DRONE_REPO_OWNER}/${process.env.DRONE_REPO_NAME}`,
		};
	},
};
