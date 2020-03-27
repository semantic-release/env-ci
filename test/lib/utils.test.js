const test = require('ava');
const {prNumber} = require('../../lib/utils');

test('prNumber', t => {
  t.is(prNumber('https://github.com/owner/repo/pull/10'), '10');
  t.is(prNumber('pull/10'), '10');
  t.is(prNumber('https://gitlab.com/owner/repo/merge_requests/10'), '10');
});
