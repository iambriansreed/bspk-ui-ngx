/**
 * Compare scss files with bspk-ui scss files of the same name
 *
 * $ npx tsx .scripts/validate-scss-files.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const ngxDir = path.join(__dirname, '../projects/ui/src/lib');

const ngxFiles = execSync(`find ${ngxDir} -type f -name "*.scss"`)
    .toString()
    .split('\n')
    .filter((l) => Boolean(l.trim));

const localReactBaseDir = path.join(__dirname, '../../bspk-ui');

const reactBaseDir = fs.existsSync(localReactBaseDir)
    ? localReactBaseDir
    : execSync('npm explore @bspk/ui -- pwd').toString().trim();

const reactDir = path.join(reactBaseDir, 'src/components');

const reactFiles = execSync(`find ${reactDir} -type f -name "*.scss"`)
    .toString()
    .split('\n')
    .filter((l) => Boolean(l.trim));

const errorFiles: string[] = [];
const successFiles: string[] = [];
const missingFiles: string[] = [];

ngxFiles.forEach((ngxFilePath: string) => {
    const fileName = path.basename(ngxFilePath);

    if (!fileName) return;

    const reactFilePath = reactFiles.find((rf) => path.basename(rf) === fileName);

    if (!reactFilePath || !fs.existsSync(reactFilePath)) {
        missingFiles.push(fileName);
        return;
    }

    const ngxContent = fs.readFileSync(ngxFilePath, 'utf-8').trim();
    const reactContent = fs.readFileSync(reactFilePath, 'utf-8').trim();

    if (ngxContent !== reactContent) {
        errorFiles.push(`Differing SCSS content: code --diff ${ngxFilePath} ${reactFilePath}\n\n`);
    }

    successFiles.push(`\x1b[32m${fileName}\x1b[0m`);
});

if (successFiles.length > 0) {
    console.log(`\x1b[32m\n\nValidated SCSS files:\x1b[0m`);
    successFiles.forEach((file) => console.log(` - ${file}`));
}

if (errorFiles.length > 0) {
    console.error('\n\nThe following SCSS files differ between Angular and React:');
    errorFiles.forEach((file) => console.error(` - ${file}`));
    process.exit(1);
}

if (missingFiles.length > 0) {
    console.error('\n\nThe following SCSS files are missing in React:');
    missingFiles.forEach((file) => console.error(` - ${file}`));
    process.exit(1);
}

// find all scss files in reactDir
