/**
 * Generates metadata by parsing @compodoc documentation JSON, and JSDocs.
 *
 * - The metadata is used to generate the component documentation pages in the demo app
 * - To generate the routes for the demo app
 * - To provide prop information for the props table in the documentation pages
 * - To provide information about which phase each component is in for the roadmap page
 * - To provide information about which components are in the library for the package readme
 *
 * $ npx tsx .scripts/meta.ts --write
 */

import { execSync } from 'child_process';
import { removeCodeQuotes, slugify } from '../utils';
import fs from 'fs';
import path from 'path';
import {
    ComponentMeta,
    ComponentMetaInput,
    ComponentMetaOutput,
    Meta,
    NavRoute,
} from '../../projects/shared/src/types';
import { documentation as compodocData } from '../../.tmp/documentation';
import * as settings from '../../.tmp/component-settings';
import { generateComponentDocs } from './component-doc';

// remove <p> and </p>\n from text
const stripCompodocMarkup = (str?: string) => str?.replace(/<\/?p>/g, '').trim() || str;

type Interface = (typeof compodocData.interfaces)[number];
type Component = (typeof compodocData.components)[number] | (typeof compodocData.directives)[number];
type ComponentInput = Component['inputsClass'][number];
type ComponentOutput = Component['outputsClass'][number];

type InterfaceProp = Interface['properties'][number];

const TYPEALIASES: Record<string, string[]> = compodocData.miscellaneous.typealiases.reduce(
    (acc, alias) => {
        // ignore certian type aliases
        if (!['BspkIcon'].includes(alias.name))
            acc[alias.name] = alias.rawtype.split('|').map((t) => t.trim().replace(/"/g, '')) || [];
        return acc;
    },
    {} as Record<string, string[]>,
);

// creates a dictionary of interfaces and props for easy lookup, merges all extended interfaces
const INTERFACES = (() => {
    const findRootProp = (maybeProp: InterfaceProp): InterfaceProp => {
        let prop = maybeProp;

        const maybeInterface = compodocData.interfaces.find((i) => i.name === maybeProp.type);
        const maybeProperty = maybeInterface?.properties.find((p) => p.name === maybeProp.name);

        return maybeProperty ? findRootProp(maybeProperty) : prop;
    };

    const resolveExtends = (_interface: Interface) => {
        if (!_interface.extends.length) return;

        // Resolve all extends first
        _interface.extends = _interface.extends.map(
            (interfaceName) => compodocData.interfaces.find((i) => i.name === interfaceName)!,
        ) as unknown as string[];
    };

    compodocData.interfaces.forEach((def) => {
        resolveExtends(def);
    });

    compodocData.interfaces.forEach((def) => {
        def.extends.forEach((extendedInterface: unknown) => {
            // Merge properties from extended interface into current interface, ensuring no duplicates
            const extendedProps = (extendedInterface as Interface).properties.filter(
                (prop) => !def.properties.some((p) => p.name === prop.name),
            );

            (def.properties as unknown as InterfaceProp[]).push(...extendedProps);
        });
    });

    const interfaceDictionary: Record<string, Record<string, ComponentMetaInput>> = {};

    // Build dictionary
    compodocData.interfaces.forEach((def) => {
        interfaceDictionary[def.name] = {};

        def.properties.forEach((property) => {
            let actualProperty = findRootProp(property);

            const propMeta = compodocToMetaProp(actualProperty, def.name);
            if (propMeta) interfaceDictionary[def.name][property.name] = propMeta;
            else console.warn(`Unable to generate metadata for property ${property.name} in interface ${def.name}`);
        });
    });

    return interfaceDictionary;
})();

export const generatedMetaPath = 'projects/demo/src/meta.ts';

function generateMeta(): Meta {
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

            // TODO: move to lint ui
            // inputs.forEach((input: any) => {
            //     if (!('type' in input)) {
            //         throw new Error(
            //             `Input ${input.name} in component ${comp.name} is missing type information in the documentation JSON. Please ensure it is properly documented.`,
            //         );
            //     }
            // });

            const componentRootDir = path.dirname(comp.file) + '/';

            if (!jsdoc?.phase) {
                console.warn(`Component ${comp.name} is missing a phase in its JSDoc comment, skipping.`);

                return [];
            }

            const { inputs, outputs } = generateComponentInputsOutputs(comp);

            return {
                name,
                file: comp.file,
                // for css, we look for styleUrlsData in the comp object, which can be a string, an array of objects with a data property, or an object with values that have a data property. We extract the CSS file paths from these structures.
                css: (() => {
                    if ('styleUrlsData' in comp && comp.styleUrlsData) {
                        if (typeof comp.styleUrlsData === 'string') return comp.styleUrlsData;

                        if (Array.isArray(comp.styleUrlsData))
                            return comp.styleUrlsData.map(({ data }) => data).join(', ');

                        if (typeof comp.styleUrlsData === 'object' && comp.styleUrlsData !== null) {
                            return Object.values(comp.styleUrlsData)
                                .map((styleObj: any) => styleObj.data)
                                .join(', ');
                        }
                    }

                    if ('styleUrl' in comp && comp.styleUrl) {
                        const stylePath = path.join(componentRootDir, comp.styleUrl);

                        if (fs.existsSync(stylePath)) return fs.readFileSync(stylePath, 'utf-8');
                    }
                    return '';
                })(),
                className: comp.name,
                slug,
                example: jsdoc?.example,
                description: jsdoc?.description || '',
                phase: jsdoc?.phase as ComponentMeta['phase'],
                directive: comp.name.endsWith('Directive'),
                exampleComponent: exampleComp?.name,
                inputs: inputs,
                outputs: outputs,
                associatedTypes: compodocData.interfaces
                    .filter((i) => i.file.startsWith(componentRootDir) && i.name !== `${name}Props`)
                    .map((i) => ({
                        name: i.name,
                        file: i.file,
                        props: Object.values(INTERFACES[i.name] || {}) || [],
                    })),
                hasContent: 'template' in comp && comp.template.includes('<ng-content'),
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

    version = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version || '';

    return { components, version, hash: branch === 'main' ? commit : branch, interfaces: INTERFACES };
}

function generateComponentInputsOutputs(component: Component): {
    outputs: ComponentMetaOutput[];
    inputs: ComponentMetaInput[];
} {
    const outputs: ComponentMetaOutput[] = [];
    const inputs: ComponentMetaInput[] = [];

    const inputsClass: ComponentInput[] = component.inputsClass;
    const outputsClass: ComponentOutput[] = component.outputsClass;

    if ('extends' in component) {
        component.extends.forEach((extendName) => {
            const found = compodocData.components.find((comp) => comp.name === extendName);
            if (!found) return;

            if ('outputsClass' in found && Array.isArray(found.outputsClass))
                outputsClass.push(
                    ...found.outputsClass.filter((output) => !outputsClass.some((o) => o.name === output.name)),
                );

            if ('inputsClass' in found && Array.isArray(found.inputsClass))
                inputsClass.push(
                    ...found.inputsClass.filter((input) => !inputsClass.some((i) => i.name === input.name)),
                );
        });
    }

    inputsClass.forEach((prop) => {
        let propMeta: ComponentMetaInput | undefined;

        if (!('type' in prop)) {
            throw new Error(
                `Input ${prop.name} in component ${component.name} is missing type information in the documentation JSON. Please ensure it is properly documented.`,
            );
        }

        // ignore types that are arrays (e.g. string[]) since those are not references to other interfaces
        if (!prop.type.endsWith('[]') && prop.type.includes('[')) {
            // match "InterfaceName['propName']"" getting InterfaceName and propName allowing for generics like "TableProps<R>['columns']" ignoring the geric types
            const match = prop.type.match(/([a-zA-Z0-9_]+)(?:<[^>]+>)?\[['"]([^'"]+)['"]\]/);
            const [, interfaceName, propName] = match || [];

            if (!interfaceName || !propName) {
                throw new Error(
                    `Unable to parse type ${prop.type} for input ${prop.name} in component ${component.name}`,
                );
            }

            propMeta = INTERFACES[interfaceName]?.[propName];

            if (typeof propMeta === 'undefined') {
                throw new Error(
                    `Unable to find prop ${propName} in interface ${interfaceName} for input ${prop.name} in component ${component.name}`,
                );
            }
        }

        inputs.push({
            name: prop.name,
            description: 'description' in prop ? stripCompodocMarkup(prop.description) : undefined,
            type: prop.type,
            required: 'required' in prop ? prop.required : undefined,
            ...propMeta,
        });
    });

    outputsClass.forEach((prop) => {
        let propMeta: ComponentMetaOutput | undefined;

        if (!('type' in prop)) {
            throw new Error(
                `Output ${prop.name} in component ${component.name} is missing type information in the documentation JSON. Please ensure it is properly documented.`,
            );
        }

        // ignore types that are arrays (e.g. string[]) since those are not references to other interfaces
        if (!prop.type.endsWith('[]') && prop.type.includes('[')) {
            // match "InterfaceName['propName']"" getting InterfaceName and propName allowing for generics like "TableProps<R>['columns']" ignoring the geric types
            const match = prop.type.match(/([a-zA-Z0-9_]+)(?:<[^>]+>)?\[['"]([^'"]+)['"]\]/);
            const [, interfaceName, propName] = match || [];

            if (!interfaceName || !propName) {
                throw new Error(
                    `Unable to parse type ${prop.type} for output ${prop.name} in component ${component.name}`,
                );
            }

            propMeta = INTERFACES[interfaceName]?.[propName];

            if (typeof propMeta === 'undefined') {
                throw new Error(
                    `Unable to find prop ${propName} in interface ${interfaceName} for output ${prop.name} in component ${component.name}`,
                );
            }
        }

        let name = prop.name;
        let type = propMeta?.type || prop.type;
        let description =
            stripCompodocMarkup(propMeta?.description) ||
            ('description' in prop ? stripCompodocMarkup(prop.description) : undefined);

        if (inputs.some((i) => i.name === prop.name)) {
            // this is a model so we change the name to "name+Change"
            // and type to the value of the input with the same name if it exists
            name = `${prop.name}Change`;
            description = `Emits when the value changes. ${description ? `\n\n${description}` : ''}`;
            type = `(value: ${[type].flat().join(' | ')}) => void`;
        }

        outputs.push({
            name,
            description,
            type,
            required: propMeta?.required || ('required' in prop ? prop.required : undefined),
        });
    });

    return { inputs, outputs };
}

/** Generates metadata props for a given interface name. */
function compodocToMetaProp(prop: InterfaceProp, interfaceName: string): ComponentMetaInput | null {
    // TODO: handle TYPESCRIPT TYPES like Exclude<"a" | "b" | "c", "b">, Omit<"a" | "b" | "c", "b">, and Record<string, any>, FabContainer, FabIconType

    if (!prop) return prop;

    const defaultValue = stripCompodocMarkup(
        'jsdoctags' in prop ? prop.jsdoctags?.find((tag) => tag.tagName.escapedText === 'default')?.comment : undefined,
    );

    const description = (() => {
        const desc = 'rawdescription' in prop ? prop.rawdescription : undefined;

        // remove ```.*``` blocks from description
        return desc?.replace(/```[\s\S]*?```/g, '').trim();
    })();

    const type = (() => {
        // split, remove surrounding quotes, and trim each type if it's a union type

        let parsedType: string | string[] = prop.type.trim();

        if (
            // types that include '|' but are not union types (e.g. generics like Omit<"a" | "b" | "c", "b">) should be left as-is
            prop.type.includes('|') &&
            // exclude generics
            !['Omit<', 'Exclude<', 'Record<'].some((generic) => prop.type.startsWith(generic))
        ) {
            parsedType = parsedType.split('|').map((t) => t.replace(/['"]/g, '').trim());
        }

        // check if primitive type
        else if (['string', 'number', 'boolean', 'null', 'undefined'].includes(prop.type)) {
            parsedType = prop.type;
        } else {
            // check if type is a type alias
            parsedType = TYPEALIASES[prop.type] || parsedType;
        }

        return parsedType.length === 1 ? parsedType[0] : parsedType;
    })();

    return {
        name: prop.name,
        description,
        type,
        default: defaultValue,
        required: !prop.optional,
    };
}

function writeMetaToFile(): Meta {
    const meta = generateMeta();

    fs.writeFileSync(
        generatedMetaPath,
        `import { Meta } from '@shared/types';\n\nexport const META: Meta = ` +
            removeCodeQuotes(JSON.stringify(meta, null, 4)) +
            ';',
    );

    fs.writeFileSync('.tmp/meta.json', JSON.stringify(meta, null, 2));

    execSync(`npx prettier --write "${generatedMetaPath}"`);

    const size = (fs.statSync(generatedMetaPath).size / 1024).toFixed(2);
    console.log(
        `\n\x1b[32m✅ Generated component metadata at ${generatedMetaPath} (${size} KB) from .tmp/documentation.json 📄\x1b[0m\n`,
    );

    return meta;
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

function writeComponentDocs(components: ComponentMeta[]): void {
    execSync(`rm -rf projects/demo/src/generated && mkdir -p projects/demo/src/generated/component`);

    components.forEach((component) =>
        generateComponentDocs(component, settings[component.name as keyof typeof settings]),
    );
}

function writeRoutesToFile(components: ComponentMeta[]): void {
    const routePath = `projects/demo/src/generated/routes.ts`;

    const routesData: NavRoute[] = components
        .filter((component) => component.phase)
        .map((metadata) => ({
            title: metadata.name,
            path: metadata.slug,
            data: { phase: metadata.phase },
            loadComponent:
                `>>() => import('../generated/component/${metadata.slug}').then((m) => m.${metadata.name}Page)<<` as any,
        }));

    fs.writeFileSync(
        routePath,
        `/** This file is auto-generated by .scripts/generate-docs.ts. Do not edit directly. Thanks! */
     import { NavRoute } from '@shared/types';
    
    export const componentItems: NavRoute[] = ${removeCodeQuotes(JSON.stringify(routesData, null, 4))};`,
    );

    console.log(`\n\x1b[32m✅ Generated component routes at ${routePath} 📄\x1b[0m\n`);
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    const meta = writeMetaToFile();

    writeComponentDocs(meta.components);

    writeRoutesToFile(meta.components);
}
