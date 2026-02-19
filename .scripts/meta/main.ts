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
import { addCodeQuotes, removeCodeQuotes, slugify, toKebabCase, toPascalCase } from '../utils';
import fs from 'fs';
import path from 'path';
import {
    ComponentMeta,
    ComponentMetaInput,
    ComponentMetaOutput,
    Meta,
    MetaComponent,
    NavRoute,
} from '../../projects/shared/src/types';
import { documentation as compodocData } from '../../.tmp/documentation';

type Interface = (typeof compodocData.interfaces)[number];
type Component = (typeof compodocData.components)[number] | (typeof compodocData.directives)[number];
type ComponentInput = Component['inputsClass'][number];
type ComponentOutput = Component['outputsClass'][number];
type InterfaceProp = Interface['properties'][number];

const GENERATED_OUTPUT_PATH = 'projects/demo/src/generated';

const COMPONENT_SELECTORS: Record<string, string> = [...compodocData.components, ...compodocData.directives]
    .filter((comp) => !!comp.selector)
    .reduce(
        (acc: Record<string, string>, comp) => {
            acc[comp.selector!.replace(/.*\[/g, '').replace(/\].*/g, '')] = comp.name;
            return acc;
        },
        {} as Record<string, string>,
    );

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

function generateMeta() {
    let components: ComponentMeta[] = [];
    let version = '0.0.0';
    let branch = 'unknown';
    let commit = 'unknown';

    //generate component metadata from compodoc data
    {
        if (!compodocData.components || !compodocData.directives) {
            throw new Error(
                'No components or directives found in documentation JSON. Please ensure Compodoc has run correctly.',
            );
        }

        const exampleComponents = compodocData.components.filter(
            (comp: any) => comp.name.startsWith('UI') && comp.name.endsWith('Example'),
        );

        components = [...compodocData.components, ...compodocData.directives]
            .flatMap((comp) => {
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

                let basicUsage: ComponentMeta['basicUsage'] = undefined;

                const { description, exampleHtml, exampleTypeScript } = parseRawDescription(
                    comp.rawdescription,
                    inputs,
                );

                if (exampleHtml)
                    basicUsage = {
                        template: exampleHtml,
                        classCode: exampleTypeScript,
                        component: addCodeQuotes('BasicUsage'),
                    };

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
                    description: description || '',
                    phase: jsdoc?.phase as ComponentMeta['phase'],
                    directive: comp.name.endsWith('Directive'),
                    exampleComponent: exampleComp?.name ? addCodeQuotes(exampleComp.name) : undefined,
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
                    basicUsage,
                } as ComponentMeta;
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
    }

    branch = execSync(`git branch --show-current`, { encoding: 'utf-8' }).trim();

    commit = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();

    version = JSON.parse(fs.readFileSync('package.json', 'utf-8')).version || '';

    return { components, version, hash: branch === 'main' ? commit : branch };
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

    writeComponentMetaFiles(meta.components);

    const outputMeta = {
        ...meta,
        components: meta.components.map(
            (component): MetaComponent => ({
                meta: addCodeQuotes(`() => import('./generated/components/${component.slug}').then((m) => m.meta)`),
                name: component.name,
                slug: component.slug,
                phase: component.phase,
            }),
        ),
    };

    fs.writeFileSync(
        generatedMetaPath,
        `import { Meta } from '@shared/types';\n\nexport const META: Meta = ` +
            removeCodeQuotes(JSON.stringify(outputMeta, null, 4)) +
            ';',
    );

    execSync(`npx prettier --write "${generatedMetaPath}"`);

    const size = (fs.statSync(generatedMetaPath).size / 1024).toFixed(2);
    console.log(
        `\n\x1b[32m✅ Generated component metadata at ${generatedMetaPath} (${size} KB) from .tmp/documentation.json 📄\x1b[0m\n`,
    );

    return outputMeta;
}

function writeComponentMetaFiles(components: ComponentMeta[]) {
    /**
     * We create a generated file for each component
     *
     * The generated file includes the example component code and imports for any components used in the example, which
     * are extracted from the JSDoc @example code. This allows us to generate the example code snippets and live
     * examples for each component in the documentation pages.
     */

    const allGeneratedComponents: { name: string; slug: string; componentName: string }[] = [];

    const hasComponentSettings = componentSettings();

    components.forEach((component) => {
        const { basicUsage, variants } = component;

        const hasSettings = hasComponentSettings(component.slug);

        const componentsToGenerate: { code: string; name: string; selector: string; imports: string[] }[] = [];

        if (basicUsage) {
            const name = 'BasicUsage';
            const selector = toKebabCase(name);

            componentsToGenerate.push({
                ...generateComponentContent(name, selector, basicUsage.template, basicUsage.classCode)!,
            });
        }

        if (variants)
            componentsToGenerate.push(
                ...variants.flatMap((variant) =>
                    variant.options.map((option) => {
                        const name = toPascalCase(`${variant.name} - ${option.name}`);
                        const selector = toKebabCase(name);
                        return {
                            ...generateComponentContent(name, selector, option.template)!,
                        };
                    }),
                ),
            );

        const imports: string[] = componentsToGenerate
            .flatMap((c) => c.imports)
            .filter((value, index, self) => value && self.indexOf(value) === index);

        const importContent = [`import { ComponentMeta } from '@shared/types';`];

        const generatedCode = componentsToGenerate.map((c) => c.code).join('\n');

        const importIcons =
            generatedCode
                .match(/(Icon[A-Z][a-zA-Z0-9]*)\b/g)
                ?.filter((icon, index, self) => self.indexOf(icon) === index) || [];

        if (importIcons.length) importContent.push(`import { ${importIcons.join(', ')} } from '@ui/icons';`);

        if (imports.length)
            importContent.push(
                `import { Component, ViewEncapsulation } from '@angular/core';`,
                `import { ${imports.join(', ')} } from '@ui/index';`,
            );

        if (hasSettings)
            importContent.push(`import { ${component.name} as settings } from '@ui/${component.slug}/settings';`);

        if (component.exampleComponent)
            importContent.push(
                `import { ${removeCodeQuotes(component.exampleComponent as any)} } from '@ui/${component.slug}/example';`,
            );

        if (generatedCode.includes('sendSnackbar'))
            importContent.push(`import { sendSnackbar } from '@ui/utils/send-snackbar';`);

        fs.writeFileSync(
            GENERATED_OUTPUT_PATH + `/components/${component.slug}.ts`,
            [
                `/** This file is auto-generated by .scripts/generate-docs.ts. Do not edit directly. */`,
                ...importContent.sort((a, b) => a.match(/'([^']+)'/)![1].localeCompare(b.match(/'([^']+)'/)![1])),
                '\n',
                generatedCode,
                `export const meta: ComponentMeta = ${removeCodeQuotes(JSON.stringify({ ...component, examplesToGenerate: undefined, settings: hasSettings ? addCodeQuotes('settings') : undefined }, null, 4))};`,
            ]
                .filter(Boolean)
                .join('\n')
                .replace(/\n\n+/g, '\n\n'),
        );

        allGeneratedComponents.push(
            ...componentsToGenerate.map((c) => ({ name: c.name, slug: component.slug, componentName: component.name })),
        );
    });

    fs.writeFileSync(
        GENERATED_OUTPUT_PATH + `/components/index.ts`,
        allGeneratedComponents
            .map((c) => `export { ${c.name} as ${c.componentName}${c.name} } from './${c.slug}';`)
            .join('\n'),
    );

    execSync(`npx prettier --write "${GENERATED_OUTPUT_PATH}/components/*.ts"`, { stdio: 'inherit' });
}

function writeRoutesToFile(components: MetaComponent[]): void {
    const routePath = `projects/demo/src/generated/routes.ts`;

    const routesData: NavRoute[] = components.flatMap((component: MetaComponent) => {
        if (!component.phase) return [];

        const { name, slug, phase } = component;

        return {
            title: component.name,
            path: component.slug,
            data: {
                name,
                slug,
                phase,
            },
            resolve: {
                meta: addCodeQuotes(`() => import('./components/${component.slug}').then((m) => m.meta)`),
            },
            // placeholder will be replaced in the actual route file
            component: addCodeQuotes('ComponentPage'),
        };
    });

    fs.writeFileSync(
        routePath,
        `/** This file is auto-generated by .scripts/generate-docs.ts. Do not edit directly. Thanks! */
import { NavRoute } from '@shared/types';
import { ComponentPage } from '../components/component-page';

export const componentItems: NavRoute[] = ${removeCodeQuotes(JSON.stringify(routesData, null, 4))};`,
    );

    console.log(`\n\x1b[32m✅ Generated component routes at ${routePath} 📄\x1b[0m\n`);
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    const meta = writeMetaToFile();

    writeRoutesToFile(meta.components);
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

function parseRawDescription(
    rawdescription: string,
    inputs: ComponentMetaInput[],
): {
    description: string;
    exampleHtml?: string;
    exampleTypeScript?: string;
} {
    // extract example code from raw description if it exists, looking for ```example\ncode\n```
    const exampleMatchHtml = rawdescription.match(/```html.*\n([\s\S]*?)\n```/);
    const exampleMatchTypeScript = rawdescription.match(/```typescript.*\n([\s\S]*?)\n```/);

    const exampleHtml = exampleMatchHtml ? exampleMatchHtml[1].trim() : undefined;
    let exampleTypeScript = exampleMatchTypeScript ? exampleMatchTypeScript[1].trim() : '';

    // remove the example code block(s) from the description
    const description = rawdescription.replace(/```[\s\S]*?\n```/g, '').trim();

    // find \[\([a-z]+\)\]="[^"]+" and return [$1, $2]
    const twoWayBindings = exampleHtml
        ? exampleHtml.match(/\[\([a-zA-Z0-9_-]+\)\]="[^"]+"/g)?.flatMap((binding) => {
              const match = binding.match(/\[\(([a-zA-Z0-9_-]+)\)\]="([^"]+)"/);
              if (!match) return [];
              const [, prop, value] = match;
              return { prop, value };
          }) || []
        : [];

    if (twoWayBindings.length) {
        exampleTypeScript += twoWayBindings
            .map(({ prop, value }) => {
                const input = inputs.find((input) => input.name === prop);

                if (input?.default) return `${value} = ${input?.default};`;

                if (input?.type === 'boolean') return `${value} = false;`;
                if (input?.type === 'number') return `${value} = 1;`;

                return `${value} = '';`;
            })
            .join('\n');
    }
    return { description, exampleHtml, exampleTypeScript };
    ``;
}

function generateComponentContent(
    name: string,
    selector: string,
    template: string | undefined,
    classCode: string | undefined = undefined,
): { code: string; imports: string[]; name: string; selector: string } | null {
    if (!template) return null;

    const imports = findComponentSelectors(template, COMPONENT_SELECTORS);

    const icons =
        template.match(/\b(Icon[A-Z][a-zA-Z0-9]+)\b/g)?.filter((icon, index, self) => self.indexOf(icon) === index) ||
        [];

    const componentName = toPascalCase(name.replace(/\s+/g, ''));

    if (!imports.length) return null;

    return {
        name,
        selector,
        code: `
@Component({
    selector: '${selector}',
    imports: [${imports.join(', ')}],
    template: \`${template}\`,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    host: { style: 'display: contents;' }
})
export class ${componentName} {${
            //
            template.includes('sendSnackbar') ? '\n    sendSnackbar = sendSnackbar;\n' : ''
        }${
            //
            classCode ? `\n${classCode}\n` : ''
        }${
            //
            icons.map((icon) => `${icon} = ${icon};`).join('')
        }}
    `,
        imports,
    };
}

/**
 * Looks for ui selectors in the provided code and returns an array of the component names used. This is used to find
 * usages of components within example code provided in JSDoc comments, so that we can include those components in the
 * documentation page for the example.
 */
export function findComponentSelectors(code: string, COMPONENT_SELECTORS: Record<string, string>): string[] {
    // if directive match ui-test in <span ui-text="anything"></span>

    const componentRegex = /<\s*ui-[a-z0-9-]+(?=[\s>])/gi;
    const directiveRegex = /\bui-[a-z0-9-]+\b/gi;

    const matches = [...(code.match(componentRegex) || []), ...(code.match(directiveRegex) || [])];
    if (!matches) return [];
    return matches
        .map((match) => {
            const selector = match.replace(/<|>/g, '');
            return COMPONENT_SELECTORS[selector];
        })
        .filter((value, index, self) => value && self.indexOf(value) === index);
}

/**
 * Removes <p> and </p> tags from the provided string, which are commonly added by Compodoc in the description fields.
 * Also trims the resulting string. If the input is undefined, it returns undefined.
 */
function stripCompodocMarkup(str?: string) {
    return str?.replace(/<\/?p>/g, '').trim() || str;
}

function componentSettings() {
    const output = execSync(`find projects/ui/src/lib -type f -name "settings.ts"`, { encoding: 'utf-8' });

    const componentsWithSettings = output
        .split('\n')
        .filter((line) => line.trim().length && !line.includes('icons'))
        .map((file) => {
            const slug = file.match(/lib\/([^\/]+)\/settings\.ts/)?.[1] || '';
            return slug;
        })
        .sort();

    return (slug: string) => componentsWithSettings.includes(slug);
}
