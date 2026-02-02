/** This script generates Field components for various input types. */
import { exec } from 'child_process';
import fs from 'fs/promises';

const CONTROLS = [
    {
        componentName: 'InputPhone',
        componentFileName: 'input-phone',
    },
];

async function run() {
    await Promise.all(CONTROLS.map(buildFieldComponentForControl));
}
void run();

async function buildFieldComponentForControl({
    componentFileName,
    componentName,
}: {
    componentFileName: string;
    componentName: string;
}) {
    const componentClassName = `UI${componentName}`;
    const fieldComponentFileName = `${componentFileName}-field`;
    const fieldComponentName = `${componentName}Field`;
    const fieldComponentClassName = `UI${fieldComponentName}`;

    await clearExistingFieldComponent(fieldComponentFileName, componentFileName);
    await makeComponentFolder(fieldComponentFileName);

    await Promise.all([
        generateFieldComponentFile(
            componentClassName,
            componentFileName,
            fieldComponentClassName,
            fieldComponentFileName,
            fieldComponentName,
        ),
        generateFieldTestFile(fieldComponentClassName, fieldComponentFileName),
        generateFieldExampleFile(fieldComponentClassName, fieldComponentName, fieldComponentFileName),
        generateFieldIndexFile(fieldComponentFileName),
    ]);
}

async function clearExistingFieldComponent(fieldComponentFileName: string, componentFileName: string) {
    const fieldPath = `./projects/ui/src/lib/${fieldComponentFileName}`;
    // ensure index file does not export the Field component
    const indexPath = `./projects/ui/src/lib/${componentFileName}/index.ts`;

    if (await fileExists(fieldPath)) {
        await fs.rm(fieldPath, { recursive: true, force: true });
    }

    const indexContent = await fs.readFile(indexPath, 'utf8');

    const exportStatement = `export * from './Field';\n`;

    if (indexContent.includes(exportStatement)) {
        await fs.writeFile(indexPath, indexContent.replace(exportStatement, ''), 'utf8');
    }
}

async function makeComponentFolder(componentFileName: string) {
    return new Promise<void>((resolve, reject) => {
        exec(`mkdir -p ./projects/ui/src/lib/${componentFileName}`, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

async function generateFieldComponentFile(
    componentClassName: string,
    componentFileName: string,
    fieldComponentClassName: string,
    fieldComponentFileName: string,
    fieldComponentName: string,
) {
    const content = `import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { FieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { ${componentClassName} } from '../${componentFileName}';

export type ${fieldComponentName}Props = Omit<FieldProps, 'controlId' | 'label'>;

/**
 * A field wrapper for the ${componentClassName} component.
 *
 * This component takes properties from the FormField and ${componentClassName} components.
 *
 * @name ${componentClassName}Field
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-${fieldComponentFileName}',
    standalone: true,
    imports: [UIField, ${componentClassName}],
    template: \`
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-${componentFileName}
                [ariaErrorMessage]="errorMessageId()"
                (valueChange)="valueChange.emit($event)"
                [ariaLabel]="ariaLabel()"
                [disabled]="disabled()"
                [id]="controlId()"
                [invalid]="invalid()"
                [name]="name()"
                [readOnly]="readOnly()"
                [value]="value()"
                [required]="required()"
                [size]="size()"
                />
        </ui-field>
    \`,
    host: {
        'data-bspk': '${fieldComponentFileName}',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ${fieldComponentClassName} extends ${componentClassName} implements AsSignal<${fieldComponentName}Props> {
    readonly valueChange = output<string | undefined>();

    readonly errorMessage = input<${fieldComponentName}Props['errorMessage']>(undefined);
    readonly label = input.required<FieldProps['label']>();
    readonly helperText = input<${fieldComponentName}Props['helperText']>(undefined);
    readonly labelTrailing = input<${fieldComponentName}Props['labelTrailing']>(undefined);
    readonly style = input<${fieldComponentName}Props['style']>(undefined);
    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('${fieldComponentClassName}-'));
}
`;

    const path = `./projects/ui/src/lib/${fieldComponentFileName}/${fieldComponentFileName}.ts`;
    await fs.writeFile(path, content, 'utf8');
}

async function generateFieldTestFile(componentClassName: string, componentFileName: string) {
    const content = `import { ComponentFixture, TestBed } from '@angular/core/testing';

import { hasNoBasicA11yIssues } from '@shared/testing/hasNoBasicA11yIssues';
import { ${componentClassName} } from './${componentFileName}';

describe('${componentClassName}', () => {
    let fixture: ComponentFixture<${componentClassName}>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [${componentClassName}],
        }).compileComponents();

        fixture = TestBed.createComponent(${componentClassName});
        fixture.componentRef.setInput('name', 'test-input');
        fixture.componentRef.setInput('ariaLabel', 'Test Input');

        fixture.detectChanges();
    });

    it('should have no basic a11y issues', async () => await hasNoBasicA11yIssues(fixture));
});
`;

    const testPath = `./projects/ui/src/lib/${componentFileName}/${componentFileName}.rtl.test.ts`;
    await fs.writeFile(testPath, content, 'utf8');
}

async function generateFieldExampleFile(componentClassName: string, componentName: string, componentFileName: string) {
    const content = `import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ${componentClassName} } from './${componentFileName}';

@Component({
    selector: 'ui-${componentFileName}-example',
    standalone: true,
    imports: [CommonModule, ${componentClassName}],
    template: \`
        <h4>Default</h4>
        <ui-${componentFileName}
            [value]="values()['default']"
            (valueChange)="update('default', $event)"
            id="default-input"
            name="default-input"
            label="${componentName} Label"
            helperText="The value of the default input is: {{ values()['default'] || 'null' }}" />

        <h4>Disabled</h4>
        <ui-${componentFileName} name="disabled-input" label="${componentName} Label" [disabled]="true" />

        <h4>Invalid</h4>
        <ui-${componentFileName} name="invalid-input" label="${componentName} Label" [invalid]="true" />

        <h4>Required</h4>
        <ui-${componentFileName} name="required-input" label="${componentName} Label" [required]="true" />

        <h4>Read Only</h4>
        <ui-${componentFileName} name="read-only-input" label="${componentName} Label" [readOnly]="true" />

        <h4>size = small</h4>
        <ui-${componentFileName} name="size-small" label="${componentName} Label" size="small" />

        <h4>size = medium</h4>
        <ui-${componentFileName} name="size-medium" label="${componentName} Label" size="medium" />

        <h4>size = large</h4>
        <ui-${componentFileName} name="size-large" label="${componentName} Label" size="large" />
    \`,
})
export class ${componentClassName}Example {
    readonly values = signal<Record<string, string | undefined>>({
        default: 'Default value example',
        'value-example': 'I am an example value',
    });

    readonly defaultValue = signal<string | undefined>('Default value example');

    update = (key: string, next: string | undefined) => {
        this.values.update((current) => ({
            ...current,
            [key]: next,
        }));
    };
}
`;

    const examplePath = `./projects/ui/src/lib/${componentFileName}/example.ts`;
    await fs.writeFile(examplePath, content, 'utf8');
}

async function generateFieldIndexFile(componentFileName: string) {
    const newIndexPath = `./projects/ui/src/lib/${componentFileName}/index.ts`;
    await fs.writeFile(newIndexPath, `export * from './${componentFileName}';`, 'utf8');
}

async function fileExists(path: string) {
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

// execSync('npx prettier --write ./projects/ui/src/lib');
