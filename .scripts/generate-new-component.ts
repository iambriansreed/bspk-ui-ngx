import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the last created component directory in projects/ui/src/lib
const libPath = path.join(__dirname, '../projects/ui/src/lib');
const dirs = fs
    .readdirSync(libPath)
    .map((name) => ({
        name,
        time: fs.statSync(path.join(libPath, name)).mtime.getTime(),
    }))
    .filter((dir) => fs.statSync(path.join(libPath, dir.name)).isDirectory())
    .sort((a, b) => b.time - a.time);

if (dirs.length > 0) {
    const componentName = dirs[0].name;
    const componentDir = path.join(libPath, componentName);

    // Create index.ts
    const indexPath = path.join(componentDir, 'index.ts');
    const exportLine = `export * from './${componentName}';\n`;
    fs.writeFileSync(indexPath, exportLine, { flag: 'w' });
    console.log(`Created ${indexPath}`);

    // Create example.ts
    const examplePath = path.join(componentDir, 'example.ts');
    // Convert kebab-case or snake_case to PascalCase for class name

    const componentNameCapitalized = componentName
        .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
        .replace(/^(.)/, (_, group1) => group1.toUpperCase());

    const className = 'UI' + componentNameCapitalized;

    const exampleName = className + 'Example';

    const exampleContent = `import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ${className} } from './${componentName}';

@Component({
    selector: 'ui-${componentName}-example',
    standalone: true,
    imports: [CommonModule, ${className}],
    template: \`
        <h4>Default</h4>
        <ui-${componentName} />
    \`,
})
export class ${exampleName} {

}
`;
    fs.writeFileSync(examplePath, exampleContent, { flag: 'w' });
    console.log(`Created ${examplePath}`);

    function replaceClassNameInFile(filePath: string, find: string, replace: string, replaceExportLine = false) {
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Replace all instances of find with replace
            const regex = new RegExp(find, 'g');
            content = content.replace(regex, replace);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated class name in ${filePath}`);
        }
    }

    const componentTsPath = path.join(componentDir, `${componentName}.ts`);
    const componentSpecPath = path.join(componentDir, `${componentName}.spec.ts`);

    // Update the component class name in componentName.ts
    replaceClassNameInFile(componentTsPath, componentNameCapitalized, className, true);

    // Update the class name in componentName.spec.ts
    replaceClassNameInFile(componentSpecPath, componentNameCapitalized, className);
}
