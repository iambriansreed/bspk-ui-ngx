/**
 * Generates example components for each Example component (example.ts) in the UI library ("projects/ui/src/lib/*") and
 * creates a route file at "projects/demo/src/routes/generated.ts".
 *
 * $ npx tsx .scripts/generate-component-routes.ts
 */

// get a list of all example files

import { toPascalCase } from './utils';
import fs from 'fs';
import path from 'path';
import { META } from '../projects/demo/src/meta';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uiLibPath = path.join(__dirname, '../projects/ui/src/lib');

const getExamples = () =>
    fs
        // get all files and folders in ui lib
        .readdirSync(uiLibPath, { withFileTypes: true })
        // then filter to only folders that contain an example.ts file
        .filter((dirent) => dirent.isDirectory() && fs.existsSync(path.join(uiLibPath, dirent.name, 'example.ts')))
        // map out name (PascalCase of slug) and slug
        .map((dirent) => ({ name: toPascalCase(dirent.name), slug: dirent.name }));

// store examples to compare during watch
let examples = getExamples();

export function generateComponentRoutes() {
    examples = getExamples();

    const generatedRoutesPath = 'projects/demo/src/routes/generated.ts';

    fs.writeFileSync(
        path.join(__dirname, '..', generatedRoutesPath),
        `
import { ComponentPage } from '../components/component-page';
import { NavRoute } from '../types';

export const componentItems: NavRoute[] = [
 ${META.components
     .map(
         // add an entry for each example
         ({ name, slug, example }) => `
            {
                title: '${name}',
                path: '${slug}',
                component: ComponentPage,
                children: [
                    {
                        path: '',
                        outlet: 'example',
                        loadComponent: () =>
                            import('${example.path.replace('projects/ui/src/lib/', '@ui/').replace(/\.ts$/, '')}').then(
                                (m) => m.${example.name},
                            ),
                    },
                ],
                data: { component: '${name}' }
            }`,
     )
     .join(',\n')}

];
`,
    );

    console.log(`\n\x1b[32m✅ Generated component routes at projects/demo/src/routes/generated.ts 📄\x1b[0m\n`);
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    generateComponentRoutes();
}

// if --watch is provided, watch for changes to example.ts files in uiLibPath and re-run the script

if (process.argv.includes('--watch')) {
    console.log(`\x1b[33m👀 Watching for changes to example.ts files...\x1b[0m\n`);

    const thisFilePath = path.join(__dirname, 'generate-component-routes.ts');

    fs.watch(thisFilePath, () => {
        console.log(
            `\n\x1b[33m🔄 Detected change to generate-component-routes.ts, regenerating component routes...\x1b[0m`,
        );
        generateComponentRoutes();
    });

    fs.watch(uiLibPath, { recursive: true }, () => {
        const examplesNow = getExamples();
        // we don't care about individual file changes, just whether the number of examples has changed or their slugs
        if (examplesNow.length !== examples.length || examplesNow.some((ex, i) => ex.slug !== examples[i].slug)) {
            console.log(
                `\n\x1b[33m🔄 Detected change to examples (${examples.length} => ${examplesNow.length}), regenerating component routes...\x1b[0m`,
            );
            generateComponentRoutes();
        }
    });
}
