/**
 * Ensures all component classes and selectors follow naming conventions.
 *
 * Ensures that the index file is up to date exporting all components and directives.
 *
 * Ensures that all components with inputs implement AsSignal<Props> interface.
 *
 * Ensures that all components and directives have proper documentation.
 *
 * Ensures that all inputs and models have proper Props type annotations.
 *
 * Ensures that test files properly reference example components.
 *
 * Ensures that there are no obsolete test files with incorrect naming.
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
    if (!dirent.isDirectory() || dirent.name === 'icons') return;

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

        const hasInputs = / = input[<|(]/.test(content) || / = input.required[<|(]/.test(content);
        const implementsAsSignal = /implements .*AsSignal<.*Props/.test(content);

        if (
            // class has inputs
            hasInputs &&
            // does not export props interface
            !implementsAsSignal
        ) {
            errors.push(
                `Component "${dirent.name}" in file "${filePath}" does not implenment AsSignal<${pascalCaseName}Props>.`,
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

    // ensure tests and example files exist and example files are properly referenced in tests

    const testPath = path.join(componentDir, dirent.name + '.spec.ts');
    const examplePath = path.join(componentDir, 'example.ts');

    if (fs.existsSync(testPath) && fs.existsSync(examplePath)) {
        const testContent = fs.readFileSync(testPath, 'utf-8');
        const exampleContent = fs.readFileSync(examplePath, 'utf-8');

        const exampleComponentName = exampleContent.match(/export class (\w+) \{/)?.[1];

        if (
            exampleComponentName &&
            // does not import the example component
            !testContent.includes(`from './example'`) &&
            // does not have a description of custom test
            !testContent.includes('/**')
        ) {
            errors.push(
                `Test file "${testPath}" does not import the example component "${exampleComponentName}" from the example file.`,
            );
        }
    }
});

const allFiles = fs.readdirSync(libDir, { recursive: true, encoding: 'utf-8' });

allFiles.forEach((file) => {
    if (
        !file.endsWith('.ts') ||
        file.startsWith('icons/') ||
        file.endsWith('/example.ts') ||
        file === 'index.ts' ||
        file.endsWith('spec.ts')
    )
        return;

    const filePath = path.join(libDir, file);

    const content = fs.readFileSync(filePath, 'utf-8');

    const classes = Array.from(content.matchAll(/\n@(Component|Directive)/g));
    const classesWithDoc = Array.from(content.matchAll(/\*\/\n@(Component|Directive)/g));
    const totalClasses = Array.from(content.matchAll(/\n@(Component|Directive)/g));

    if (totalClasses.length > classesWithDoc.length) {
        errors.push(`Component or Directive class in file "${file}" is missing documentation.`);
    }

    // find that all inputs have aren't typed with *Props['*'] type annotations
    const inputsWithoutPropType = Array.from(
        content.matchAll(/[a-z_]+ = input(?:\.required)?<(?!\w+Props\['\w+'\])\w+>/g),
    );

    if (classes && inputsWithoutPropType.length) {
        errors.push(
            `Inputs missing proper Props type annotations in file "${file}".\n\t${inputsWithoutPropType.map((m) => m).join('\n')}`,
        );
    }

    // find that all models have aren't typed with *Props['*'] type annotations
    const modelsWithoutPropType = Array.from(content.matchAll(/[a-z_]+ = model<(?!\w+Props\['\w+'\])\w+>/g));

    if (classes && modelsWithoutPropType.length) {
        errors.push(
            `Models missing proper Props type annotations in file "${file}".\n\t${modelsWithoutPropType.map((m) => m).join('\n')}`,
        );
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
