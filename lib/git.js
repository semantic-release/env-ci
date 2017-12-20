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
    return execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout;
  } catch (err) {
    return undefined;
  }
}

module.exports = {configuration, head, branch};
