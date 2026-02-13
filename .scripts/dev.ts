import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('\x1b[33mStarting dev environment with live metadata and route generation...\x1b[0m');

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uiSrcPath = path.join(__dirname, '../projects/ui/src');

console.log('\x1b[33mWatching for changes to regenerate component metadata...\x1b[0m');

const generateMetaScriptPath = path.join(__dirname, 'meta.ts');

let lastEvent = {
    filename: '',
    eventType: '',
};
let writeTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);

const getComponentSlugs = () =>
    fs.readdirSync(uiSrcPath).filter((file) => fs.statSync(path.join(uiSrcPath, file)).isDirectory());

let previousComponents: string[] = getComponentSlugs();

[uiSrcPath, generateMetaScriptPath].forEach((proj) => {
    fs.watch(proj, { recursive: true }, (eventType, filename) => {
        const nextComponents: string[] = getComponentSlugs();

        const hasComponentChanges = previousComponents.join(',') !== nextComponents.join(',');

        if (
            !filename ||
            filename === 'meta.ts' ||
            filename === 'generated.ts' ||
            (lastEvent.filename === filename && lastEvent.eventType === eventType) ||
            // no component changes
            !hasComponentChanges
        )
            return;

        clearTimeout(writeTimeout);

        writeTimeout = setTimeout(() => {
            execSync(`npm run meta f`, { stdio: 'inherit' });

            lastEvent = { filename, eventType };

            if (hasComponentChanges) {
                const newComponents = nextComponents.filter((ex) => !previousComponents.includes(ex));
                const removedComponents = previousComponents.filter((ex) => !nextComponents.includes(ex));

                console.log(`\n\x1b[33m🔄 Detected change to components, regenerating component routes...\x1b[0m`);

                if (newComponents.length)
                    console.log(`\x1b[32m➕ New components added: ${newComponents.join(', ')}\x1b[0m`);

                if (removedComponents.length)
                    console.log(`\x1b[31m➖ Components removed: ${removedComponents.join(', ')}\x1b[0m`);
            }

            previousComponents = nextComponents;
        }, 100);
    });
});
