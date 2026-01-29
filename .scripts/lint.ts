/**
 * Ensures all component classes and selectors follow naming conventions.
 *
 * Ensures that the public API file is up to date.
 *
 * $ npx tsx .scripts/lint.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { getIndexFileContent } from './update-index.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const libDir = path.join(__dirname, '../projects/ui/src/lib');

const files = fs.readdirSync(libDir, { withFileTypes: true });

const errors: string[] = [];

const warnings: string[] = [];

files.forEach((dirent) => {
    if (dirent.isDirectory()) {
        if (dirent.name === 'icons') return;

        const componentDir = path.join(libDir, dirent.name);
        const componentFilePath = path.join(componentDir, dirent.name + '.ts');
        const directiveFilePath = path.join(componentDir, dirent.name + '.directive.ts');

        const pascalCaseName = dirent.name
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');

        const filesToCheck: {
            filePath: string;
            type: 'component' | 'directive';
        }[] = [];

        if (fs.existsSync(componentFilePath)) filesToCheck.push({ filePath: componentFilePath, type: 'component' });

        if (fs.existsSync(directiveFilePath)) filesToCheck.push({ filePath: directiveFilePath, type: 'directive' });

        filesToCheck.forEach(({ filePath, type }) => {
            const content = fs.readFileSync(filePath, 'utf-8');

            if (type === 'component' && !content.includes('@name')) return;

            if (!/implements .*AsInputSignal<.*Props/.test(content)) {
                warnings.push(
                    `Component "${dirent.name}" in file "${filePath}" does not implenment ${pascalCaseName}Props.`,
                );
            }

            const classNameExpected = `UI${pascalCaseName}${type === 'directive' ? 'Directive' : ''}`;
            const selectorExpected = type === 'component' ? `ui-${dirent.name}` : `[ui-${dirent.name}]`;

            const classNameMatches = Array.from(content.matchAll(/export class (\w+)[<|\s]/g)).map((m) => m[1]);

            if (!classNameMatches.length) {
                errors.push(`No class found in file "${filePath}".`);
            } else if (!classNameMatches.some((name) => name === classNameExpected)) {
                if (type === 'component')
                    errors.push(
                        `Class name(s) "${classNameMatches.join(', ')}" in file "${filePath}" does not follow the convention and should be ${classNameExpected}.`,
                    );
            }

            const selectorMatch = content.match(/selector:\s*'([^']+)'/)?.[1];

            if (!selectorMatch) {
                errors.push(`No selector found in file "${filePath}".`);
            } else if (
                // not a direct match
                selectorMatch !== selectorExpected &&
                // allow for selectors that include both tag and attribute
                !selectorMatch.includes(`[ui-${dirent.name}]`)
            ) {
                const selectorMatch = content.match(/selector:\s*'([^']+)'/)?.[0];

                errors.push(
                    `Selector "${selectorMatch}" in file "${filePath}" does not follow the convention and should be "${selectorExpected}".`,
                );
            }
        });
    }
});

console.log('\x1b[32mAll components and directives follow naming conventions 🎉✅\x1b[0m\n');

// ensure index is up to date
// compare existing index content to generated content

const { indexPath, indexContent } = getIndexFileContent();

const existingIndexContent = fs.readFileSync(indexPath, 'utf-8');

if (existingIndexContent !== indexContent) {
    errors.push('Index is out of date. Please run:   npx tsx .scripts/update-index.ts --write\n');
} else {
    console.log('\x1b[32mIndex is up to date 🎉✅\x1b[0m\n');
}

if (errors.length > 0) {
    console.error([`❌ Lint Error${errors.length > 1 ? 's' : ''}:`, ...errors].join('\n\n'));
    process.exit(1);
}

if (warnings.length > 0) {
    console.warn(`\x1b[33m${[`⚠️ Lint Warning${warnings.length > 1 ? 's' : ''}:`, ...warnings].join('\n\n')}\x1b[0m`);
}
