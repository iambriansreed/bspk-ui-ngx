/**
 *
 * Generates Angular components for each SVG icon in the @bspk/icons package.
 *
 *
 * $ npx tsx .scripts/generate-icon-components.ts
 */

const componentTemplate = (svg: string, slug: string, name: string) => `
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-${slug}',
  template: \`${svg}\`,
  styles: [':host { display: contents; }'],
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

const iconsDir = path.join(__dirname, '../node_modules/@bspk/icons');

// get list of svg files from the @bspk/icons package
const svgFiles = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'));

svgFiles.forEach((file) => {
  const filePath = path.join(iconsDir, file);
  const svgContent = fs
    .readFileSync(filePath, 'utf-8')
    .trim()
    .replace('<!--Copyright 2025 Anywhere Real Estate - CC BY 4.0-->', '')
    .replace('<svg', '<svg [style.width]="width"'); // remove copyright comment;
  const name = path.basename(file, '.svg'); // e.g., 'add'
  // from PascalCase to kebab-case
  const slug = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const component = componentTemplate(svgContent, slug, name);
  const outputPath = pathTemplate(slug);
  fs.writeFileSync(outputPath, component);
});

execSync('npx prettier --write "projects/ui/src/lib/icons/*.ts"');
console.log('Icon components generated successfully.');
