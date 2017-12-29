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

| Service                                                     | `isCi` | `service` | `commit` | `build` | `branch` | `job` | `pr` | `isPr` | `slug` | `root` |
|-------------------------------------------------------------|:------:|:---------:|:--------:|:-------:|:--------:|:-----:|:----:|:------:|:------:|:------:|
| [AppVeyor](https://www.appveyor.com)                        | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Buildkite](https://buildkite.com)                          | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ❌   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Circleci](https://circleci.com)                            | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ❌    |
| [Codeship](https://codeship.com)                            | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ❌    |
| [Drone](http://try.drone.io)                                | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ❌    |
| [Gitlab CI](https://about.gitlab.com/features/gitlab-ci-cd) | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ❌   |   ❌    |   ✅    |   ✅    |
| [Jenkins](https://jenkins-ci.org)                           | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ✅    |
| [Semaphore](https://semaphoreci.com)                        | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Shippable](https://www.shippable.com)                      | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Travis](https://travis-ci.org/)                            | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ✅   |  ✅   |   ✅    |   ✅    |   ✅    |
| [Wercker](http://www.wercker.com/)                          | ✅      |     ✅     |    ✅     |    ✅    |    ✅     |   ❌   |  ❌   |   ❌    |   ✅    |   ✅    |

If none of the above CI services is detected, `commit` and `branch` are determined based on the local Git repository, and `isCi` is determined based on  the `CI` environment variable.
