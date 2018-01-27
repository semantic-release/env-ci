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

const {isCi, service, commit, build, branch, job, pr, isPr, slug, root} = envCi();
```

## Variables

| Variable  | Description                                                                       |
|-----------|-----------------------------------------------------------------------------------|
| `isCi`    | `true` is running on a CI, `false` otherwise                                      |
| `service` | CI service name                                                                   |
| `commit`  | Commit sha that triggered the CI build                                            |
| `build`   | CI service build number                                                           |
| `branch`  | Git branch being built or targeted by a pull request                              |
| `job`     | CI service job number                                                             |
| `pr`      | Pull Request number                                                               |
| `isPr`    | `true` is the build has been triggered by a Pull Request, `false` otherwise       |
| `slug`    | The slug (in form: owner_name/repo_name) of the repository currently being built. |
| `root`    | The path to the directory where the repository is being built                     |

## Supported CI

| CI Service                                                                                                |  `service`  | `isCi` | `commit` | `build` | `branch` | `job` | `pr` | `isPr` | `slug` | `root` |
|-----------------------------------------------------------------------------------------------------------|:-----------:|:------:|:--------:|:-------:|:--------:|:-----:|:----:|:------:|:------:|:------:|
| [AppVeyor]( https://www.appveyor.com/docs/environment-variables)                                          | `appveyor`  |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Bamboo](https://confluence.atlassian.com/bamboo/bamboo-variables-289277087.html)                         |  `bamboo`   |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ❌   |   ❌    |   ❌    |   ✅    |
| [Bitrise](http://devcenter.bitrise.io/faq/available-environment-variables/#exposed-by-bitriseio)          |  `bitrise`  |   ✅    |    ✅     |    ✅    |    ✅     |   ❌   |  ✅   |   ✅    |   ✅    |   ❌    |
| [Buildkite](https://buildkite.com/docs/builds/environment-variables)                                      | `buildkite` |   ✅    |    ✅     |    ✅    |    ✅     |   ❌   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Circleci](https://circleci.com/docs/1.0/environment-variables)                                           | `circleci`  |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ❌    |
| [Codeship](https://documentation.codeship.com/basic/builds-and-configuration/set-environment-variables)   | `codeship`  |   ✅    |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ❌    |
| [Drone](http://readme.drone.io/0.5/usage/environment-reference)                                           |   `drone`   |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ❌    |
| [Gitlab CI](https://docs.gitlab.com/ce/ci/variables/README.html)                                          |  `gitlab`   |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ❌   |   ❌    |   ✅    |   ✅    |
| [Jenkins](https://wiki.jenkins.io/display/JENKINS/Building+a+software+project)                            |  `jenkins`  |   ✅    |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ✅    |
| [Semaphore](https://semaphoreci.com/docs/available-environment-variables.html)                            | `semaphore` |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Shippable](http://docs.shippable.com/ci/env-vars/#stdEnv)                                                | `shippable` |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [TeamCity](https://confluence.jetbrains.com/display/TCD10/Predefined+Build+Parameters)                    | `teamcity`  |   ✅    |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ✅    |
| [Travis](https://docs.travis-ci.com/user/environment-variables)                                           |  `travis`   |   ✅    |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Wercker](http://devcenter.wercker.com/docs/environment-variables/available-env-vars#hs_cos_wrapper_name) |  `wercker`  |   ✅    |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ✅    |

If none of the above CI services is detected, `commit` and `branch` are determined based on the local Git repository, and `isCi` is determined based on  the `CI` environment variable.
