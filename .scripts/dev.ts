import fs from 'fs';
import path from 'path';
import { generatedMetaPath, writeMetaToFile } from './generate-meta';
import { generateComponentRoutes, getExamples } from './generate-component-routes';

console.log('\x1b[33mStarting dev environment with live metadata and route generation...\x1b[0m');

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uiSrcPath = path.join(__dirname, '../projects/ui/src');

console.log('\x1b[33mWatching for changes to regenerate component metadata...\x1b[0m');

const generateMetaScriptPath = path.join(__dirname, 'generate-meta.ts');
const generateRoutesScriptPath = path.join(__dirname, 'generate-component-routes.ts');

let lastEvent = {
    filename: '',
    eventType: '',
};
let writeTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);
let previousExamples = getExamples();

[uiSrcPath, generateMetaScriptPath, generateRoutesScriptPath].forEach((proj) => {
    fs.watch(proj, { recursive: true }, (eventType, filename) => {
        const nextExamples = getExamples();

        const hasExampleChanges = previousExamples.join(',') !== nextExamples.join(',');

        console.log({
            eventType,
            filename,
            hasExampleChanges,
        });

        if (
            !filename ||
            filename === 'meta.ts' ||
            filename === 'generated.ts' ||
            (lastEvent.filename === filename && lastEvent.eventType === eventType) ||
            // no example changes
            !hasExampleChanges
        )
            return;

        clearTimeout(writeTimeout);

        writeTimeout = setTimeout(() => {
            const meta = writeMetaToFile(true);

            lastEvent = { filename, eventType };

            console.log(
                `\n\x1b[32m✅ Regenerated component metadata at ${generatedMetaPath} ${eventType} on ${filename} 📄\x1b[0m\n`,
            );

            if (hasExampleChanges) {
                generateComponentRoutes(meta);

                const newExamples = nextExamples.filter((ex) => !previousExamples.includes(ex));
                const removedExamples = previousExamples.filter((ex) => !nextExamples.includes(ex));

                console.log(`\n\x1b[33m🔄 Detected change to examples, regenerating component routes...\x1b[0m`);

                if (newExamples.length) console.log(`\x1b[32m➕ New examples added: ${newExamples.join(', ')}\x1b[0m`);

                if (removedExamples.length)
                    console.log(`\x1b[31m➖ Examples removed: ${removedExamples.join(', ')}\x1b[0m`);
            }

            previousExamples = nextExamples;
        }, 100);
    });
});
