/**
 * Ensures all component classes and selectors follow naming conventions.
 *
 * Ensures that the public API file is up to date.
 *
 * $ npx tsx .scripts/lint.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { getPublicApiFileContent } from './update-public-api.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const libDir = path.join(__dirname, '../projects/ui/src/lib');

const files = fs.readdirSync(libDir, { withFileTypes: true });

const errors: string[] = [];

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

            const classNameExpected = `UI${pascalCaseName}${type === 'directive' ? 'Directive' : ''}`;
            const selectorExpected = type === 'component' ? `ui-${dirent.name}` : `[ui-${dirent.name}]`;

            const classNameMatch = content.match(/export class (\w+)[<|\s]/)?.[1];

            if (!classNameMatch) {
                errors.push(`No class found in file "${filePath}".`);
            } else if (classNameMatch !== classNameExpected) {
                if (type === 'component')
                    errors.push(
                        `Class name "${classNameMatch}" in file "${filePath}" does not follow the convention and should be ${classNameExpected}.`,
                    );
            }

            const selectorMatch = content.match(/selector:\s*'([^']+)'/)?.[1];

            if (!selectorMatch) {
                errors.push(`No selector found in file "${filePath}".`);
            } else if (selectorMatch !== selectorExpected) {
                const selectorMatch = content.match(/selector:\s*'([^']+)'/)?.[0];

                errors.push(
                    `Selector "${selectorMatch}" in file "${filePath}" does not follow the convention and should be "${selectorExpected}".`,
                );
            }
        });
    }
});

console.log('\x1b[32mAll components and directives follow naming conventions 🎉✅\x1b[0m\n');

// ensure public api is up to date
// compare existing public api content to generated content

const { publicApiPath, publicApiContent } = getPublicApiFileContent();

const existingPublicApiContent = fs.readFileSync(publicApiPath, 'utf-8');

if (existingPublicApiContent !== publicApiContent) {
    errors.push('Public API is out of date. Please run:   npx tsx .scripts/update-public-api.ts --write\n');
} else {
    console.log('\x1b[32mPublic API is up to date 🎉✅\x1b[0m\n');
}

if (errors.length > 0) {
    console.error([`❌ Lint Error${errors.length > 1 ? 's' : ''}:`, ...errors].join('\n\n'));
    process.exit(1);
}
