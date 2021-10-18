const test = require('ava');
const netlify = require('../../services/netlify');

const env = {
  CI: 'true',
  NETLIFY: 'true',
  SITE_NAME: 'website-name',
  SITE_ID: '37597ed0-087c-4d3e-960f-1d5c8fbac75e',
  URL: 'https://example.com',
  COMMIT_REF: '495d988cee629dbf63dca717e0vd1e4f77afd034',
  HEAD: 'test-page',
  BRANCH: 'test-page',
  BUILD_ID: '60106253d15c6600087018ef',
  DEPLOY_ID: '60106253d13f6600587118d1',
  DEPLOY_URL: 'https://60106253d13f6600587118d1--website-name.netlify.app',
  DEPLOY_PRIME_URL: 'https://website-name.netlify.app',
  REPOSITORY_URL: 'https://github.com/owner/repo',
  PWD: '/opt/build/repo',
};

test('Push', t => {
  t.deepEqual(netlify.configuration({env}), {
    name: 'Netlify',
    service: 'netlify',
    commit: '495d988cee629dbf63dca717e0vd1e4f77afd034',
    branch: 'test-page',
    build: '60106253d13f6600587118d1',
    buildUrl: 'https://app.netlify.com/sites/website-name/deploys/60106253d13f6600587118d1',
    pr: undefined,
    isPr: false,
    prBranch: undefined,
    slug: 'owner/repo',
    root: '/opt/build/repo',
  });
});

test('PR', t => {
  t.deepEqual(
    netlify.configuration({
      env: {
        ...env,
        BRANCH: 'pull/12/head',
        PULL_REQUEST: 'true',
        REVIEW_ID: '12',
        DEPLOY_PRIME_URL: 'https://deploy-preview-12--website-name.netlify.app',
      },
    }),
    {
      name: 'Netlify',
      service: 'netlify',
      commit: '495d988cee629dbf63dca717e0vd1e4f77afd034',
      branch: undefined,
      build: '60106253d13f6600587118d1',
      buildUrl: 'https://app.netlify.com/sites/website-name/deploys/60106253d13f6600587118d1',
      pr: '12',
      isPr: true,
      prBranch: 'test-page',
      slug: 'owner/repo',
      root: '/opt/build/repo',
    }
  );
});
