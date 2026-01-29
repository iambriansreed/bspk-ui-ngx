/**
 * Generates example components for each Example component (example.ts) in the UI library ("projects/ui/src/lib/*") and
 * creates a route file at "projects/demo/src/routes/generated.ts".
 *
 * $ npx tsx .scripts/generate-component-routes.ts
 */

// get a list of all example files

import fs from 'fs';
import path from 'path';
import { META } from '../projects/demo/src/meta';
import { Meta } from '../projects/demo/src/types';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uiLibPath = path.join(__dirname, '../projects/ui/src/lib');

export const getExamples = (): string[] =>
    fs
        // get all files and folders in ui lib
        .readdirSync(uiLibPath, { withFileTypes: true })
        // then filter to only folders that contain an example.ts file
        .filter((dirent) => dirent.isDirectory() && fs.existsSync(path.join(uiLibPath, dirent.name, 'example.ts')))
        // map out name (PascalCase of slug) and slug
        .map((dirent) => dirent.name)
        .sort();

export function generateComponentRoutes(meta: Meta = META): void {
    const generatedRoutesPath = path.join(__dirname, '..', 'projects/demo/src/routes/generated.ts');

    fs.rmSync(generatedRoutesPath, { force: true });

    fs.writeFileSync(
        generatedRoutesPath,
        `
import { ComponentPage } from '../components/component-page';
import { NavRoute } from '../types';

export const componentItems: NavRoute[] = [
 ${meta.components
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
