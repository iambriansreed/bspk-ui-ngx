/**
 * This script contains functionality that needs to run before running the meta script.
 *
 * It is responsible for generating the compodoc documentation in JSON format and merging all settings.ts files into a
 * single file for easier importing in the meta script.
 *
 * $ npx tsx .scripts/meta-pre.ts --write
 */

import { execSync } from 'child_process';
import fs from 'fs';
import { toPascalCase } from '../utils';

/** Functionality that needs to run before running meta script */
export function preMeta(force = false) {
    execSync(`rm -rf projects/demo/src/generated && mkdir -p projects/demo/src/generated/components`, {
        stdio: 'inherit',
    });

    if (force || !fs.existsSync('.tmp/documentation.json')) {
        execSync('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp --silent', { stdio: 'inherit' });
        fs.writeFileSync(
            '.tmp/documentation.ts',
            `export const documentation = ${fs.readFileSync('.tmp/documentation.json', 'utf-8')}`,
        );
        execSync('npx prettier --write .tmp/documentation.ts', { stdio: 'inherit' });
    }

    console.log('\x1b[32m✅ Metadata pre-processing complete.\x1b[0m');
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    preMeta(process.argv.includes('f'));
}
