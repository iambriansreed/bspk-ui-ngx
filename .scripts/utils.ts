import * as path from 'path';
import { toPascalCase } from '../projects/shared/src/utils';

export { slugify, toKebabCase, toPascalCase, toTitleCase } from '../projects/shared/src/utils';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** Adds code quotes to a string. This ensures code survives JSON.stringify(). */
export function addCodeQuotes<T = any>(code: string): T {
    return `%%${code}%%` as unknown as T;
}

/** Applied just before writing out the final TS file. */
export function removeCodeQuotes(str: string): string {
    return str.replace(/"%%/g, '').replace(/%%"/g, '').replace(/%%/g, '');
}
