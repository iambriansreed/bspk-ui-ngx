import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function toPascalCase(str: string) {
    return str
        .replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase())
        .replace(/(\d+)([a-zA-Z])/g, (_, num, chr) => num + chr.toUpperCase()) // Capitalize after numbers
        .replace(/([a-z])([A-Z]+)/g, (_, a, b) => a + b); // Preserve consecutive uppercase
}

export async function pretty(filePath: string) {
    const tempPath = 'pretty.ts';

    // read file contents and save to temp file
    const content = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(path.join(__dirname, '..', tempPath), content, 'utf-8');

    console.log(`Running prettier on ${filePath}... tempPath: ${tempPath}`);
    // run prettier on temp file
    execSync(`npx prettier --write "${tempPath}"`, { stdio: 'inherit' });
    // read temp file contents and save to original file
    const prettyContent = fs.readFileSync(path.join(__dirname, '..', tempPath), 'utf-8');
    fs.writeFileSync(filePath, prettyContent, 'utf-8');
    // delete temp file
    // execSync(`rm "${tempPath}"`);
}

export function slugify(value: string | string[]) {
    let slug = [value]
        .flat()
        .join('-')
        .toLowerCase()
        .replace(/[\s| |_/]/g, '-')
        .replace(/[^a-z0-9-]+/g, '')
        .replace(/[-]+/g, '-')
        .replace(/^[-]+/g, '')
        .replace(/[-]+$/g, '');

    const slugSegments = slug.split('-');
    slug = slugSegments.filter((segment, index) => segment !== slugSegments[index - 1]).join('-');

    // fix double segments like brand-on-brand -> on-brand, shadow-*-shadow -> shadow-*
    slug = slug.replace(/shadow-([^-]+)-shadow/, 'shadow-$1').replace(/brand-on-brand/, 'brand-on');

    return slug;
}
