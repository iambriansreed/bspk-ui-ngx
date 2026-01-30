/**
 * Generates metadata for component demos by parsing documentation JSON.
 *
 * $ npx tsx .scripts/generate-meta.ts --write
 */

import { execSync } from 'child_process';
import { toPascalCase } from './utils';
import fs from 'fs';
import path from 'path';
import { ComponentDemo, Meta } from '../projects/demo/src/types';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const documentationPath = path.join(__dirname, '../.tmp/documentation.json');

export const generatedMetaPath = 'projects/demo/src/meta.ts';

export function generateMeta(dev?: boolean): Meta {
    execSync('npx @compodoc/compodoc -p tsconfig.doc.json -e json -d ./.tmp');

    const metadata = JSON.parse(fs.readFileSync(documentationPath, 'utf-8'));

    // find components that end with 'ComponentNameExample' and their base component 'ComponentName'

    const exampleComponents = [
        metadata.components.filter((comp: any) => comp.name.endsWith('Example') && comp.name.startsWith('UI')),
    ].flat();

    const components: ComponentDemo[] = [...metadata.components, ...metadata.directives]
        .flatMap((comp: any): ComponentDemo | [] => {
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
                className: comp.name,
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
        })
        .sort((a, b) => {
            if (a.name !== b.name) return a.name.localeCompare(b.name);
            // directives before non-directives
            return Number(b.directive) - Number(a.directive);
        })
        .filter((value, index, self) => {
            const prevName = index > 0 ? self[index - 1].name : null;
            return !prevName || prevName !== value.name;
        });

    const branch = execSync(`git branch --show-current`, { encoding: 'utf-8' }).trim();

    const commit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

    const version: string = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')).version || '';

    return { components, version, hash: branch === 'main' ? commit : branch };
}

export function writeMetaToFile(dev?: boolean): Meta {
    const meta = generateMeta(dev);
    fs.writeFileSync(generatedMetaPath, 'export const META = ' + JSON.stringify(meta, null, 4));
    return meta;
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    writeMetaToFile();

    console.log(`\n\x1b[32m✅ Generated component metadata at ${generatedMetaPath} 📄\x1b[0m\n`);
}
