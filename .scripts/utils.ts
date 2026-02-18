import * as path from 'path';

export { slugify, toKebabCase, toPascalCase, toTitleCase } from '../projects/shared/src/utils';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export function removeCodeQuotes(str: string): string {
    return str.replace(/">>/g, '').replace(/<<"/g, '');
}
