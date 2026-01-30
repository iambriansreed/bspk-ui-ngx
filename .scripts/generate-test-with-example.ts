/**
 * Generates a basic test file for a component based on its example file.
 *
 * $ npx tsx .scripts/generate-test-with-example.ts --write new-component-slug
 */
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const libDir = path.join(__dirname, '../projects/ui/src/lib');

export function generateTestWithExample(componentSlug: string, force: boolean = false) {
    const testPath = path.join(libDir, componentSlug, componentSlug + '.spec.ts');

    const examplePath = path.join(libDir, componentSlug, 'example.ts');

    const testPathPretty = `\x1b[33m${testPath.replace(libDir, 'projects/ui/src/lib')}\x1b[0m`;

    if (!fs.existsSync(examplePath)) {
        console.error(`Example file does not exist ${testPathPretty}`);
        return;
    }

    if (fs.existsSync(testPath) && !force) {
        console.error(`Test file already exists ${testPathPretty} and --force not provided.`);
        return;
    }

    const properName = componentSlug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    const exampleContent = fs.readFileSync(examplePath, 'utf-8');

    const exampleComponentName = exampleContent.match(/export class (\w+) \{/)?.[1];

    fs.writeFileSync(
        testPath,
        `import { ComponentFixture, TestBed } from '@angular/core/testing';
    import { hasNoBasicA11yIssues } from '@shared/testing/hasNoBasicA11yIssues';
    import { spyOn } from 'jest-mock';
    import { ${exampleComponentName} } from './example';
    
    describe('${properName}', () => {
        let component:  ${exampleComponentName};
        let fixture: ComponentFixture< ${exampleComponentName}>;
        let errorSpy: any;
    
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [ ${exampleComponentName}],
            }).compileComponents();
    
            errorSpy = spyOn(console, 'error');
            fixture = TestBed.createComponent( ${exampleComponentName});
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    
        afterEach(() => {
            errorSpy.mockRestore();
        });
    
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    
        it('should not have console errors', () => {
            expect(errorSpy).not.toHaveBeenCalled();
        });
    
        it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
    });
    `,
    );

    console.log(`Generated test file ${testPathPretty}` + (fs.existsSync(testPath) && force ? ' (overwritten)' : ''));
}

// if --write is provided, generate the routes once
if (process.argv.includes('--write')) {
    const force = process.argv.includes('--force');

    const args = process.argv.filter((arg) => arg !== '--write' && arg !== '--force');

    const componentSlug = args[args.length - 1];

    // ensure component slug is formatted correctly
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(componentSlug)) {
        console.error(`Component slug "${componentSlug}" is not formatted correctly.`);
        process.exit(1);
    }

    generateTestWithExample(componentSlug, force);
}
