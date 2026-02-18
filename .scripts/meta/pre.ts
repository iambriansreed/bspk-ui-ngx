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
    if (force || !fs.existsSync('.tmp/documentation.json')) {
        execSync('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp --silent', { stdio: 'inherit' });
        fs.writeFileSync(
            '.tmp/documentation.ts',
            `export const documentation = ${fs.readFileSync('.tmp/documentation.json', 'utf-8')}`,
        );
        execSync('npx prettier --write .tmp/documentation.ts', { stdio: 'inherit' });
    }

    // merge all settings.ts files into a single file for easier importing in the meta script, excluding any settings files in the icons directory since those are not used for generating documentation
    const output = execSync(`find projects/ui/src/lib -type f -name "settings.ts"`, { encoding: 'utf-8' });

    const files = output
        .split('\n')
        .filter((line) => line.trim().length && !line.includes('icons'))
        .map((file) => {
            const slug = file.match(/lib\/([^\/]+)\/settings\.ts/)?.[1] || '';
            return `export { ${toPascalCase(slug)} } from '../projects/ui/src/lib/${slug}/settings';`;
        })
        .join('\n');

    fs.writeFileSync('.tmp/component-settings.ts', files);

    execSync('npx prettier --write .tmp/component-settings.ts', { stdio: 'inherit' });

    console.log('\x1b[32m✅ Metadata pre-processing complete.\x1b[0m');
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    preMeta(process.argv.includes('f'));
}
