import { format, Options } from 'prettier';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginHtml from 'prettier/plugins/html';
import prettierPluginCss from 'prettier/plugins/postcss';
import prettierPluginTypescript from 'prettier/plugins/typescript';

export async function pretty(source: string, options?: Options) {
    const prettyOptions = {
        semi: true,
        singleQuote: true,
        trailingComma: 'all' as const,
        tabWidth: 4,
        printWidth: 80,
        parser: 'typescript',
        plugins: [prettierPluginTypescript, prettierPluginEstree, prettierPluginCss, prettierPluginHtml],
        ...options,
    };

    if (options?.parser === 'html') {
        prettyOptions.singleAttributePerLine = false;
        prettyOptions.htmlWhitespaceSensitivity = 'ignore';
        prettyOptions.bracketSameLine = false;
        prettyOptions.printWidth = 60;
        // prevent prettier from breaking up html attributes into multiple lines since that makes them harder to read in the documentation
    }

    return await format(source, prettyOptions).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        return source;
    });
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
