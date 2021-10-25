const test = require('ava');
const cloudflare = require('../../services/cloudflare.js');

const env = {
  CF_PAGES: '1',
  CF_PAGES_COMMIT_SHA: '6792f396eadca08926a7c810b7b77fa3815db1f4',
  CF_PAGES_BRANCH: 'main',
  PWD: '/opt/buildhome/repo',
};

test('Push', (t) => {
  t.deepEqual(cloudflare.configuration({env}), {
    name: 'Cloudflare Pages',
    service: 'cloudflare',
    commit: '6792f396eadca08926a7c810b7b77fa3815db1f4',
    branch: 'main',
    root: '/opt/buildhome/repo',
  });
});
