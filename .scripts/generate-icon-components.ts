/**
 * Generates Angular components for each SVG icon in the @bspk/icons package.
 *
 * $ npx tsx .scripts/generate-icon-components.ts
 */

const componentTemplate = (svg: string, slug: string, name: string) => `
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-${slug}',
    template: \`${svg}\`,
    styles: ['icon-${slug} { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class Icon${name} {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
`;

const pathTemplate = (slug: string) => `projects/ui/src/lib/icons/${slug}.ts`;

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Add this line:
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const iconsDir = path.join(__dirname, '../node_modules/@bspk/icons');

// get list of svg files from the @bspk/icons package
const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'));

const slugs = new Set<string>();
svgFiles.forEach((file) => {
    const filePath = path.join(iconsDir, file);
    const svgContent = fs
        .readFileSync(filePath, 'utf-8')
        .trim()
        .replace('<!--Copyright 2025 Anywhere Real Estate - CC BY 4.0-->', '')
        .replace('<svg', '<svg [attr.width]="width"'); // remove copyright comment;
    const name = path.basename(file, '.svg'); // e.g., 'add'
    // from PascalCase to kebab-case
    function toKebabCase(name: string) {
        return name
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // aB -> a-B, 0B -> 0-B
            .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2') // ABc -> A-Bc, AZAscend -> A-Z-Ascend
            .replace(/([A-Z])(\d)/g, '$1-$2') // A2 -> A-2
            .replace(/([0-9])([A-Z])/g, '$1-$2') // 2F -> 2-F
            .replace(/([a-z])([0-9])/g, '$1-$2') // y2 -> y-2
            .replace(/([A-Z])([A-Z])/g, '$1-$2') // AZ -> A-Z
            .replace(/^-/, '') // Remove leading dash if present
            .toLowerCase();
    }
    
    // Usage in your script:
    const slug = toKebabCase(name);
    const component = componentTemplate(svgContent, slug, name);
    const outputPath = pathTemplate(slug);
    slugs.add(slug);
    fs.writeFileSync(outputPath, component);
});

fs.writeFileSync(
    pathTemplate('index'),
    Array.from(slugs)
        .map((slug) => `export * from './${slug}';`)
        .join('\n'),
);

execSync('npx prettier --write "projects/ui/src/lib/icons/*.ts"');
console.log('Icon components generated successfully.');
