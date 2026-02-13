import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentPhase } from '../projects/shared/src/types';
import { ColorVariant } from '../projects/ui/src/utils/color-variants';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function toPascalCase(str: string) {
    return str
        .replace(/(^\w|-\w)/g, (m) => m.replace(/-/, '').toUpperCase())
        .replace(/(\d+)([a-zA-Z])/g, (_, num, chr) => num + chr.toUpperCase()) // Capitalize after numbers
        .replace(/([a-z])([A-Z]+)/g, (_, a, b) => a + b) // Preserve consecutive uppercase
        .replace(/\s/g, '');
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
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // aB -> a-B, 0B -> 0-B
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2') // ABc -> A-Bc, AZAscend -> A-Z-Ascend
        .replace(/([A-Z])(\d)/g, '$1-$2') // A2 -> A-2
        .replace(/([0-9])([A-Z])/g, '$1-$2') // 2F -> 2-F
        .replace(/([a-z])([0-9])/g, '$1-$2') // y2 -> y-2
        .replace(/([A-Z])([A-Z])/g, '$1-$2') // AZ -> A-Z
        .replace(/^-/, '') // Remove leading dash if present
        .toLowerCase();

    const slugSegments = slug.split('-');
    slug = slugSegments.filter((segment, index) => segment !== slugSegments[index - 1]).join('-');

    // fix double segments like brand-on-brand -> on-brand, shadow-*-shadow -> shadow-*
    slug = slug.replace(/shadow-([^-]+)-shadow/, 'shadow-$1').replace(/brand-on-brand/, 'brand-on');

    return slug;
}

export function toKebabCase(str: string) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // aB -> a-B, 0B -> 0-B
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2') // ABc -> A-Bc, AZAscend -> A-Z-Ascend
        .replace(/([A-Z])(\d)/g, '$1-$2') // A2 -> A-2
        .replace(/([0-9])([A-Z])/g, '$1-$2') // 2F -> 2-F
        .replace(/([a-z])([0-9])/g, '$1-$2') // y2 -> y-2
        .replace(/([A-Z])([A-Z])/g, '$1-$2') // AZ -> A-Z
        .replace(/^-/, '') // Remove leading dash if present
        .toLowerCase();
}

export function toTitleCase(str: string) {
    return str.replace(/\b([a-z])/g, function (_, initial) {
        return initial.toUpperCase();
    });
}

export function removeCodeQuotes(str: string): string {
    return str.replace(/">>/g, '').replace(/<<"/g, '');
}

export const COMPONENT_PHASE_COLORS: Record<ComponentPhase, ColorVariant> = {
    Backlog: 'grey',
    Dev: 'blue',
    UXReview: 'purple',
    Stable: 'green',
    Utility: 'magenta',
};
