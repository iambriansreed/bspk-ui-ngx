/**
 * Generates metadata for component demos by parsing documentation JSON.
 *
 * $ npx tsx .scripts/generate-meta.ts --write
 */

import { execSync } from 'child_process';
import { pretty, toPascalCase } from './utils';
import fs from 'fs';
import path from 'path';
import { ComponentDemo } from '../projects/demo/src/types';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const documentationPath = path.join(__dirname, '../.tmp/documentation.json');

export const generatedMetaPath = 'projects/demo/src/meta.ts';

export function generateMeta(): { version: string; components: ComponentDemo[] } {
    execSync('npx compodoc -p tsconfig.doc.json -e json -d ./.tmp');

    const metadata = JSON.parse(fs.readFileSync(documentationPath, 'utf-8'));

    // fund compoennts that end with 'ComponentNameExample' and their base component 'ComponentName'

    const exampleComponents = [
        metadata.components.filter((comp: any) => comp.name.endsWith('Example') && comp.name.startsWith('UI')),
    ].flat();

    const components: ComponentDemo[] = [...metadata.components, ...metadata.directives].flatMap((comp: any) => {
        const exampleComp = exampleComponents.find(
            (exComp: any) =>
                exComp.name === `${comp.name}Example` ||
                exComp.name === `${comp.name.replace(/Directive$/, '')}Example`,
        );

        if (!exampleComp) return [];

        const name = toPascalCase(comp.name.replace(/^UI/, '').replace(/Directive$/, ''));

        const slug = name.replace(/([a-z])([A-Z])/g, (_: any, a: any, b: string) => `${a}-${b}`).toLowerCase();

        const example = comp.rawdescription.match(/```html([\s\S]*?)```;/)?.[1]?.trim() || '';

        // remove code from rawdescription
        const description = comp.rawdescription.split('```html')[0].trim();

        const phase = comp.sourceCode.match(/@phase\s+(\w+)/)?.[1] || 'Dev';

        return {
            name,
            slug,
            descriptionExample: comp.description,
            description,
            phase,
            directive: comp.name.endsWith('Directive'),
            example: {
                name: exampleComp.name,
                path: exampleComp.file,
            },
        };
    });

    // get version from package.json

    const version: string = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')).version || '';

    return { components, version };
}

function writeMetaToFile() {
    const meta = generateMeta();
    fs.writeFileSync(generatedMetaPath, 'export const META = ' + JSON.stringify(meta, null, 4));
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    writeMetaToFile();
}

// if --watch is provided, watch for changes and regenerate on change
if (process.argv.includes('--watch')) {
    console.log('\x1b[33mWatching for changes to regenerate component metadata...\x1b[0m');

    const thisFilePath = path.join(__dirname, 'generate-meta.ts');

    ['projects/ui', thisFilePath].forEach((proj) => {
        fs.watch(proj, { recursive: true }, (eventType, filename) => {
            if (filename === 'meta.ts' || filename === 'generated.ts') return;

            writeMetaToFile();

            console.log(
                `\n\x1b[32m✅ Regenerated component metadata at ${generatedMetaPath} ${eventType} on ${filename} 📄\x1b[0m\n`,
            );
        });
    });
}
