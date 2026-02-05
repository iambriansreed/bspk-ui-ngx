/**
 * Generates metadata by parsing @compodoc documentation JSON, and JSDocs.
 *
 * - Documentation site uses meta to build component reference pages
 * - Documentation site component pages use meta to display prop tables, examples, and descriptions
 * - Lint UI uses the metadata to ensure that all components have documentation, examples, and properly documented inputs.
 *
 * $ npx tsx .scripts/generate-meta.ts --write
 */

import { execSync } from 'child_process';
import { slugify } from './utils';
import fs from 'fs';
import path from 'path';
import { ComponentMeta, InputsClassItem, Meta } from '../projects/shared/src/types';

// remove <p> and </p>\n from text
const stripCompodocMarkup = (str?: string) => str?.replace(/<\/?p>/g, '').trim() || str;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const generatedMetaPath = 'projects/demo/src/meta.ts';

import compodocData from '../.tmp/documentation.json';

export function generateMeta(): Meta {
    // const compodocData2 = getDocumentationJson(true);

    let components: ComponentMeta[] = [];
    let version = '0.0.0';
    let branch = 'unknown';
    let commit = 'unknown';

    /**
     * Find components that end with 'ComponentNameExample' and their base component 'ComponentName'
     *
     * If a component does not have an example, it is not included in the metadata. This ensures that all components in
     * the metadata have a corresponding example.
     */

    if (!compodocData.components || !compodocData.directives) {
        throw new Error(
            'No components or directives found in documentation JSON. Please ensure Compodoc has run correctly.',
        );
    }

    const exampleComponents = compodocData.components.filter(
        (comp: any) => comp.name.startsWith('UI') && comp.name.endsWith('Example'),
    );

    components = [...compodocData.components, ...compodocData.directives]
        .flatMap((comp): ComponentMeta | [] => {
            if (!comp.name.startsWith('UI') || comp.name.endsWith('Example')) return [];

            const name = comp.name.replace(/^UI/, '').replace(/Directive$/, '');
            const slug = slugify(name);

            const exampleComp = exampleComponents.find(
                (exComp: any) =>
                    exComp.name === `${comp.name}Example` ||
                    exComp.name === `${comp.name.replace(/Directive$/, '')}Example`,
            );

            const content = comp.sourceCode;

            const jsdoc = content
                .match(/\/\*\*\s*\n([^*]|(\*(?!\/)))*\*\//g)
                ?.map(jsDocParse)
                .find((c) => c.name === name);
            // move to lint ui
            // inputs.forEach((input: any) => {
            //     if (!('type' in input)) {
            //         throw new Error(
            //             `Input ${input.name} in component ${comp.name} is missing type information in the documentation JSON. Please ensure it is properly documented.`,
            //         );
            //     }
            // });

            return {
                name,
                file: comp.file,
                // for css, we look for styleUrlsData in the comp object, which can be a string, an array of objects with a data property, or an object with values that have a data property. We extract the CSS file paths from these structures.

                css: (() => {
                    if (!('styleUrlsData' in comp)) return '';

                    if (typeof comp.styleUrlsData === 'string') return comp.styleUrlsData;

                    if (Array.isArray(comp.styleUrlsData)) return comp.styleUrlsData.map(({ data }) => data).join(', ');

                    if (typeof comp.styleUrlsData === 'object' && comp.styleUrlsData !== null) {
                        return Object.values(comp.styleUrlsData)
                            .map((styleObj: any) => styleObj.data)
                            .join(', ');
                    }

                    return '';
                })(),
                className: comp.name,
                slug,
                example: jsdoc?.example,
                description: jsdoc?.description || '',
                phase: jsdoc?.phase as ComponentMeta['phase'],
                directive: comp.name.endsWith('Directive'),
                exampleComponent: exampleComp
                    ? {
                          name: exampleComp.name,
                          path: exampleComp.file,
                      }
                    : undefined,
                props: generateMetaProps(name),
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

    branch = execSync(`git branch --show-current`, { encoding: 'utf-8' }).trim();

    commit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

    version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')).version || '';

    return { components, version, hash: branch === 'main' ? commit : branch };
}

export function generateMetaProps(name: string) {
    return (
        compodocData.interfaces
            .find((i: any) => i.name === `${name}Props`)
            ?.properties.map((prop) => {
                const defaultValue = stripCompodocMarkup(
                    'jsdoctags' in prop
                        ? prop.jsdoctags?.find((tag) => tag.tagName.escapedText === 'default')?.comment
                        : undefined,
                );

                const description = (() => {
                    const desc = 'rawdescription' in prop ? prop.rawdescription : undefined;

                    // remove ```.*``` blocks from description
                    return desc?.replace(/```[\s\S]*?```/g, '').trim();
                })();

                return {
                    name: prop.name,
                    description,
                    type: prop.type,
                    default: defaultValue,
                    required: !prop.optional,
                    exampleType: prop.type,
                };
            }) || []
    );
}

export function writeMetaToFile(): Meta {
    const meta = generateMeta();
    fs.writeFileSync(
        generatedMetaPath,
        `import { Meta } from '@shared/types';\n\nexport const META: Meta = ` + JSON.stringify(meta, null, 4),
    );

    execSync(`npx prettier --write "${generatedMetaPath}"`);

    return meta;
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    writeMetaToFile();

    const size = (fs.statSync(generatedMetaPath).size / 1024).toFixed(2);
    console.log(`\n\x1b[32m✅ Generated component metadata at ${generatedMetaPath} (${size} KB) 📄\x1b[0m\n`);
}

// Simple JSDoc parser to extract tags and description
function jsDocParse(content: string) {
    try {
        const contentTrimmed = content
            .trim()
            .replace(/^\/\*\*/, '')
            .replace(/\*\/$/, '');

        const chunks: string[] = contentTrimmed.replace(/\n\s*\* @/g, '&&split&&%%variable%%').split('&&split&&');

        const data: Record<string, string> = {};

        chunks.forEach((chunk) => {
            if (chunk.startsWith('%%variable%%')) {
                const chunkMatch = [...(chunk.match(/^%%variable%%([^\s]+)\s(.*)/s) || [])];

                if (!chunkMatch) throw new Error(`Unable to process chunk.`);

                const [, key, value] = chunkMatch;

                if (!value) return;

                data[key] = value
                    .replace(/\n[ ]+\*([ ]*)/g, '\n')
                    .replace(/^\s+\*\s+/, '')
                    .trim()
                    .replace(/;$/, '');

                return;
            }

            data.description = chunk
                .replace(/\n[ ]+\*([ ]*)/g, '\n')
                .replace(/(\S)\n(\S)/g, (_, a, b) => `${a} ${b}`)
                .trim();
        });

        return data;
    } catch (error) {
        console.error(error);
        return {};
    }
}
