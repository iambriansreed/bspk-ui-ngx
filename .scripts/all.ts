/**
 * This script is intended to be a single entry point for all of the various scripts that may be a little too
 * complicated to run in a single cli command.
 */
import { execSync as execSyncBase } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';

const { cyan, yellow } = chalk;

const exec = (command: string) => execSyncBase(command, { stdio: 'inherit' });

const args = process.argv.slice(3);

const scriptDictionary: Record<string, () => void> = { meta };

const nextScript = scriptDictionary[process.argv[2]];

if (nextScript) {
    console.log(yellow(`${'Running script:'} ${cyan(process.argv[2])} with args: ${cyan(args.join(', ') || 'none')}`));

    nextScript();
} else {
    console.error(`No script found for ${process.argv[2]}`);
    process.exit(1);
}

// Script implementations

function meta() {
    if (args.includes('f') || !fs.existsSync('.tmp/documentation.json'))
        exec('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp');

    exec('npx tsx .scripts/generate-meta.ts --write');
}
