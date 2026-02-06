/**
 * This script is intended to be a single entry point for all of the various scripts that may be a little too
 * complicated to run in a single cli command.
 */
import { execSync as execSyncBase } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

const SCRIPTS = {
    /** Generates the metadata file used for documentation generation. */
    meta() {
        if (args.includes('f') || !fs.existsSync('.tmp/documentation.json'))
            exec('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp');

        exec('npx tsx .scripts/generate-meta.ts --write');
    },

    'update-version'() {
        // read the latest tag from git
        exec('git fetch --tags');
        const latestTag = execSyncBase('git describe --tags').toString().trim().substring(1); // remove the leading 'v' from the tag

        // update the version in package.json and projects/ui/package.json to match the latest tag
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
        const uiPackageJson = JSON.parse(fs.readFileSync('projects/ui/package.json', 'utf-8'));

        packageJson.version = latestTag;
        uiPackageJson.version = latestTag;

        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        fs.writeFileSync('projects/ui/package.json', JSON.stringify(uiPackageJson, null, 2));

        // update the version in package.json and projects/ui/package.json to match the latest tag

        exec('git add package.json projects/ui/package.json');

        // commit the changes and push to the repo

        exec(`git commit -m "chore: update version to ${latestTag} [skip ci]"`);
        exec('git push');
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
