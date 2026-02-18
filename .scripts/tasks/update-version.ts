/**
 * Updates the version in package.json and projects/ui/package.json to match the latest tag in the repo, then commits
 * and pushes the changes.
 *
 * This is intended to be run as part of the release process after a new version has been tagged, to ensure that the
 * version in package.json matches the latest tag.
 *
 * $ npx tsx .scripts/tasks/update-version.ts
 */
// get the latest tag in the format X.Y.Z - no v or other prefix or suffix

import fs from 'fs';
import { execSync } from 'child_process';

const latestVersion = execSync('git fetch --tags && git tag -l --sort=-creatordate | head -n 1', {
    encoding: 'utf-8',
})
    .trim()
    .substring(1)
    .split('-')[0];

// update the version in package.json and projects/ui/package.json to match the latest tag
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const uiPackageJson = JSON.parse(fs.readFileSync('projects/ui/package.json', 'utf-8'));
const packageLockJson = JSON.parse(fs.readFileSync('package-lock.json', 'utf-8'));

packageJson.version = latestVersion;
uiPackageJson.version = latestVersion;
packageLockJson.version = latestVersion;
packageLockJson.packages[''].version = latestVersion;

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4));
fs.writeFileSync('projects/ui/package.json', JSON.stringify(uiPackageJson, null, 4));
fs.writeFileSync('package-lock.json', JSON.stringify(packageLockJson, null, 4));

// update the version in package.json and projects/ui/package.json to match the latest tag

execSync('git add package.json projects/ui/package.json package-lock.json', { stdio: 'inherit' });

// commit the changes and push to the repo

execSync(`git commit -m "chore: update version to ${latestVersion} [skip ci]"`, { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
