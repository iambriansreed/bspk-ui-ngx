/**
 * This script is intended to be a single entry point for all of the various scripts that may be a little too
 * complicated to run in a single cli command.
 */
import { execSync as execSyncBase } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

const SCRIPTS = {
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
     * $ npm run meta
     */
    meta() {
        if (args.includes('f') || !fs.existsSync('.tmp/documentation.json'))
            exec('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp');

        exec('npx tsx .scripts/generate-meta.ts --write');
    },

    /**
     * Updates the version in package.json and projects/ui/package.json to match the latest tag in the repo, then
     * commits and pushes the changes.
     *
     * This is intended to be run as part of the release process after a new version has been tagged, to ensure that the
     * version in package.json matches the latest tag.
     *
     * $ npm run update-version
     */
    'update-version'() {
        // get the latest tag in the format X.Y.Z - no v or other prefix or suffix
        const latestVersion = execSyncBase('git fetch --tags && git tag -l --sort=-creatordate | head -n 1', {
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

        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        fs.writeFileSync('projects/ui/package.json', JSON.stringify(uiPackageJson, null, 2));

        // update the version in package.json and projects/ui/package.json to match the latest tag

        // exec('git add package.json projects/ui/package.json');

        // // commit the changes and push to the repo

        // exec(`git commit -m "chore: update version to ${latestVersion} [skip ci]"`);
        // exec('git push');
    },
};

const { cyan, yellow } = chalk;

const exec = (command: string) => execSyncBase(command, { stdio: 'inherit' });

const args = process.argv.slice(3);

const nextScript = process.argv[2] in SCRIPTS ? SCRIPTS[process.argv[2] as keyof typeof SCRIPTS] : null;

if (nextScript) {
    console.log(yellow(`${'Running script:'} ${cyan(process.argv[2])} with args: ${cyan(args.join(', ') || 'none')}`));

    nextScript();
} else {
    console.error(`No script found for ${process.argv[2]}`);
    process.exit(1);
}
