import { format, Options } from 'prettier';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginHtml from 'prettier/plugins/html';
import prettierPluginCss from 'prettier/plugins/postcss';
import prettierPluginTypescript from 'prettier/plugins/typescript';

export async function pretty(source: string, options?: Options) {
    return await format(source, {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 4,
        printWidth: 100,
        parser: 'typescript',
        plugins: [prettierPluginTypescript, prettierPluginEstree, prettierPluginCss, prettierPluginHtml],
        ...options,
    }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        return source;
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
