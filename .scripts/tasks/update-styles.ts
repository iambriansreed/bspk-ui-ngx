/**
 * Update the styles and ui libraries and copy the brand stylesheets from the bspk-styles package to the demo public
 * folder
 *
 * This is intended to be run after making changes to the styles or ui libraries, to ensure that the demo project is
 * using the latest versions.
 *
 * $ npx tsx .scripts/tasks/update-styles.ts
 */
import fs from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';

// Build the styles library

console.log(chalk.yellow('Updating bspk-ui library...'));

execSync(`npm un @bspk/ui && npm install -D @bspk/ui`, { stdio: 'inherit' });

// get the version of styles from the @bspk/ui package.json
//  use npm view @bspk/ui version --json to get the latest version of @bspk/styles
const uiPackageJson = JSON.parse(execSync('npm view @bspk/ui --json', { encoding: 'utf-8' }).trim());

const stylesVersion = uiPackageJson.dependencies['@bspk/styles'].replace(/^(\^|~)/, '');

console.log(chalk.yellow(`Updating bspk-styles library from bspk-ui to peer dependencies...`));

execSync(`npm un @bspk/styles && npm install -D @bspk/styles@${stylesVersion}`, { stdio: 'inherit' });

// copy @bspk/styles from dev to peer dependencies
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

delete packageJson.devDependencies['@bspk/styles'];

packageJson.peerDependencies['@bspk/styles'] = `^${stylesVersion}`;

// sort peer dependencies alphabetically
packageJson.peerDependencies = Object.fromEntries(
    Object.entries(packageJson.peerDependencies).sort(([a], [b]) => a.localeCompare(b)),
);

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4));

// copy styles from the bspk-styles package to /projects/demo/public/brand-styles
console.log(chalk.yellow(`Copying bspk-styles assets to demo public folder...`));

execSync(`rm -rf ./projects/demo/public/brand-styles && mkdir -p ./projects/demo/public/brand-styles`, {
    stdio: 'inherit',
});

// only copy the brands folder from styles to the demo public folder

const BRANDS = await import('@bspk/styles/brands').then((module) => module.BRANDS);

BRANDS.forEach((brand) => {
    execSync(`cp ./node_modules/@bspk/styles/${brand.slug}.css ./projects/demo/public/brand-styles`, {
        stdio: 'inherit',
    });
});
