import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const git = (directory, ...args) => execFileSync('git', ['-C', directory, ...args], {
  encoding: 'utf8',
  maxBuffer: 8 * 1024 * 1024,
});
const files = (directory, ...paths) => new Map(
  git(directory, 'ls-tree', '-rz', 'HEAD', '--', ...paths).split('\0').filter(Boolean).map((row) => {
    const tab = row.indexOf('\t');
    return [row.slice(tab + 1), row.slice(0, tab)];
  }),
);
const manifest = JSON.parse(readFileSync(new URL('../versions.json', import.meta.url), 'utf8'));
const gitlinks = new Map([...files(root)].filter(([, entry]) => entry.startsWith('160000 commit ')));

assert.deepEqual([...gitlinks.keys()].sort(), Object.keys(manifest).sort(), 'Manifest must list every submodule');
for (const [component, sha] of Object.entries(manifest)) {
  assert.equal(gitlinks.get(component), `160000 commit ${sha}`, `Update the manifest or gitlink for ${component}`);
  assert.equal(git(root + component, 'rev-parse', 'HEAD').trim(), sha, `Check out the pinned ${component} revision`);
}

const template = readFileSync(root + 'deploy/.env.example', 'utf8');
const compose = readFileSync(root + 'deploy/compose.yaml', 'utf8');
assert.equal(template.match(/^AGILFRAME_REF=([0-9a-f]{40})\r?$/m)?.[1], manifest.core, 'Deploy .env.example must pin the release Core');
assert.equal(compose.match(/\$\{AGILFRAME_REF:-([0-9a-f]{40})\}/)?.[1], manifest.core, 'Compose must default to the release Core');

const sourcePaths = {
  websdk: ['agil/websdk', 'agil/core/packages/protocol', 'agil/core/apps/dashboard'],
  mobile: ['agil/mobile'],
  nodes: ['agil/core/nodes', 'agil/infra/node-agent'],
};
const coreFiles = files(root + 'core');
for (const [component, paths] of Object.entries(sourcePaths)) {
  const ownedFiles = files(root + component, ...paths);
  assert.ok(ownedFiles.size, `No tracked source files found for ${component}`);
  const mismatches = [...ownedFiles].filter(([path, entry]) => coreFiles.get(path) !== entry).map(([path]) => path);
  assert.deepEqual(mismatches, [], `Update the Core copies from ${component}`);
  console.log(`${component}: ${ownedFiles.size} files match Core`);
}
console.log('Release manifest, Deploy defaults and checkout match');
