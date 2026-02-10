/**
 * This script is intended to be a single entry point for all of the various scripts that may be a little too
 * complicated to run in a single cli command.
 */
import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

const SCRIPTS: Record<string, () => void | Promise<void>> = {
    /**
     * Generates the metadata file used for documentation generation.
     *
     * This should be run after any changes to the codebase that may affect the documentation, such as adding new
     * components or changing existing ones. It is also run as part of the release process to ensure that the
     * documentation is up to date with the latest changes.
     *
     * This script checks if the 'f' argument is included or if the documentation.json file does not exist, and if so,
     * it runs the compodoc command to generate the documentation in JSON format. Then it runs the generate-meta.ts
     * script to write the metadata file.
     *
     * $ npm run - meta
     */
    meta() {
        if (args.includes('f') || !fs.existsSync('.tmp/documentation.json'))
            execSync('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp', { stdio: 'inherit' });

        execSync('npx tsx .scripts/generate-meta.ts --write', { stdio: 'inherit' });
    },

    /**
     * Updates the version in package.json and projects/ui/package.json to match the latest tag in the repo, then
     * commits and pushes the changes.
     *
     * This is intended to be run as part of the release process after a new version has been tagged, to ensure that the
     * version in package.json matches the latest tag.
     *
     * $ npm run - update-version
     */
    'update-version'() {
        // get the latest tag in the format X.Y.Z - no v or other prefix or suffix
        const latestVersion = execSync('git fetch --tags && git tag -l --sort=-creatordate | head -n 1', {
            encoding: 'utf-8',
        })
            .trim()
            .substring(1)
            .split('-')[0];

        // update the version in package.json and projects/ui/package.json to match the latest tag
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        const uiPackageJson = JSON.parse(fs.readFileSync('projects/ui/package.json', 'utf-8'));

        packageJson.version = latestVersion;
        uiPackageJson.version = latestVersion;

        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4));
        fs.writeFileSync('projects/ui/package.json', JSON.stringify(uiPackageJson, null, 4));

        // update the version in package.json and projects/ui/package.json to match the latest tag

        execSync('git add package.json projects/ui/package.json', { stdio: 'inherit' });

        // commit the changes and push to the repo

        execSync(`git commit -m "chore: update version to ${latestVersion} [skip ci]"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
    },

    /**
     * Update the styles and ui libraries and copy the brand stylesheets from the bspk-styles package to the demo public
     * folder
     *
     * This is intended to be run after making changes to the styles or ui libraries, to ensure that the demo project is
     * using the latest versions.
     *
     * $ npm run - update-styles
     */
    'update-styles': async () => {
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
    },
};

const { cyan, yellow } = chalk;
const args = process.argv.slice(3);
const scriptName = cyan(process.argv[2]);
const scriptFn = process.argv[2] in SCRIPTS ? SCRIPTS[process.argv[2] as keyof typeof SCRIPTS] : null;

//
(async () => {
    if (scriptFn) {
        const log = [`Running script`, scriptName];
        if (args.length) log.push(`with args: ${cyan(args.join(', '))}`);
        console.log(yellow(log.join(' ')));

        await scriptFn();
    } else {
        console.error(`No script found for ${process.argv[2]}`);
        process.exit(1);
    }
})();
