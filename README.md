# env-ci

Get environment variables exposed by CI services.

[![Travis](https://img.shields.io/travis/pvdlg/env-ci.svg)](https://travis-ci.org/pvdlg/env-ci)
[![Codecov](https://img.shields.io/codecov/c/github/pvdlg/env-ci.svg)](https://codecov.io/gh/pvdlg/env-ci)
[![Greenkeeper badge](https://badges.greenkeeper.io/pvdlg/env-ci.svg)](https://greenkeeper.io/)

Adapted from [codecov-node](https://github.com/codecov/codecov-node/blob/master/lib/detect.js).

## Install

```bash
$ npm install --save env-ci
```

## Usage

```js
const envCi = require('env-ci');

const {name, service, isCi, branch, commit, tag, build, buildUrl, job, jobUrl, isPr, pr, slug, root} = envCi();

if (isCI) {
  console.log(`Building branch ${branch} of repo ${slug} on ${name}`);

  if (isPr) {
    console.log(`Building Pull Request #${pr}`);
  }

  if (service === 'travis') {
    // Do something specific to Travis CI
  }
}
```

## Supported variables

| Variable   | Description                                                                       |
|------------|-----------------------------------------------------------------------------------|
| `name`     | CI service Commercial name (e.g. `Travis CI`, `CircleCI`, `GitLab CI/CD`)         |
| `service`  | Standardized CI service name (e.g. `travis`, `circleci`, `gitlab`)                |
| `isCi`     | `true` is running on a CI, `false` otherwise                                      |
| `branch`   | Git branch being built or targeted by a pull request                              |
| `commit`   | Commit sha that triggered the CI build                                            |
| `tag`      | Git tag that triggered the CI build                                               |
| `build`    | CI service build number                                                           |
| `buildUrl` | Link to the CI service build                                                      |
| `job`      | CI service job number                                                             |
| `jobUrl`   | Link to the CI service job                                                        |
| `isPr`     | `true` is the build has been triggered by a Pull Request, `false` otherwise       |
| `pr`       | Pull Request number                                                               |
| `slug`     | The slug (in form: owner_name/repo_name) of the repository currently being built  |
| `root`     | The path to the directory where the repository is being built                     |

**Note**: Some variables can be detected only on certain CI services. See [Supported CI](#supported-ci).

## Supported CI

| CI Service (`name`)                                                                                                                    |  `service`  |       `isCi`       |      `branch`      |      `commit`      |       `tag`        |      `build`       |     `buildUrl`     |       `job`        |      `jobUrl`      |       `isPr`       |        `pr`        |       `slug`       |       `root`       |
|----------------------------------------------------------------------------------------------------------------------------------------|:-----------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|:------------------:|
| [AppVeyor]( https://www.appveyor.com/docs/environment-variables)                                                                       | `appveyor`  | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Bamboo](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html)                                                      |  `bamboo`   | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: |
| [Bitbucket](https://confluence.atlassian.com/bitbucket/environment-variables-794502608.html)                                           | `bitbucket` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: |
| [Bitrise](https://devcenter.bitrise.io/builds/available-environment-variables/#exposed-by-bitriseio)                                   |  `bitrise`  | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |
| [Buddy](https://buddy.works/knowledge/deployments/how-use-environment-variables#default-environment-variables)                         |   `buddy`   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |
| [Buildkite](https://buildkite.com/docs/builds/environment-variables)                                                                   | `buildkite` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [CircleCI](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables)                                                     | `circleci`  | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |
| [Cirrus CI](https://cirrus-ci.org/guide/writing-tasks/#environment-variables)                                                          |  `cirrus`   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [AWS CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html)                                    | `codebuild` | :white_check_mark: |     :warning:      | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: |
| [Codeship](https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables/#default-environment-variables) | `codeship`  | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: |        :x:         |
| [Drone](https://readme.drone.io/reference/environ/)                                                                                    |   `drone`   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |
| [Gitlab CI/CD](https://docs.gitlab.com/ce/ci/variables/README.html)                                                                    |  `gitlab`   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: |
| [Jenkins](https://wiki.jenkins.io/display/JENKINS/Building+a+software+project)                                                         |  `jenkins`  | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: |
| [Sail CI](https://sail.ci/docs/environment-variables)                                                                                  |   `sail`    | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         |         :x:        |        :x:         |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Semaphore](https://semaphoreci.com/docs/available-environment-variables.html)                                                         | `semaphore` | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: |        :x:         | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Shippable](http://docs.shippable.com/ci/env-vars/#stdEnv)                                                                             | `shippable` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [TeamCity](https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters)                                                 | `teamcity`  | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: |
| [Travis CI](https://docs.travis-ci.com/user/environment-variables#default-environment-variables)                                       |  `travis`   | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Visual Studio Team Services](https://docs.microsoft.com/en-us/vsts/pipelines/build/variables)                                         |   `vsts`    | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: |        :x:         |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: |
| [Wercker](http://devcenter.wercker.com/docs/environment-variables/available-env-vars#hs_cos_wrapper_name)                              |  `wercker`  | :white_check_mark: | :white_check_mark: | :white_check_mark: |        :x:         | :white_check_mark: | :white_check_mark: |        :x:         |        :x:         |        :x:         |        :x:         | :white_check_mark: | :white_check_mark: |

**Note**: If none of the above CI services is detected, `commit` and `branch` are determined based on the local Git repository, and `isCi` is determined based on  the `CI` environment variable.

## API

### envCi(options) => Result

#### options

Type: `Object`

#### env

Type: `Object`<br>
Default: `process.env`

The object to read environment variables from.

#### cwd

Type: `String`<br>
Default: `process.cwd()`

The current working directory in which to execute `git` commands used to determine the `commit` and `branch` [Result](#result) properties in case no [supported CI](#supported-ci) is detected.

### Result

Type: `Object`

[Environment variables values](#supported-variables) exposed by the CI service.

## Caveats :warning:

### Git `branch` determination

Certain CI services don't provide an environment variable to determine the current Git branch being built.
In such cases the branch is determined with the command `git rev-parse --abbrev-ref HEAD`.

However, if the local repository is in a [detached head state](https://git-scm.com/docs/git-checkout#_detached_head) the branch cannot be determined directly. In such case, `env-ci` will look for the remote branches having the same HEAD as the local detached HEAD to determine the branch from which the detached HEAD was created.

In the rare case where there is multiple remote branches with the same HEAD as the local detached HEAD, `env-ci` will arbitrarily pick the first one. This can lead to an inaccurate `branch` value for certain CI services in such circumstances.

Affected CI services:
- [AWS CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html)
