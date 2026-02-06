/**
 * This script generates Field components for various input types.
 *
 * Provide no arguments; the controls to generate are hardcoded in the CONTROLS array.
 *
 * $ npx tsx .scripts/generate-fields.ts
 */
import { execSync } from 'child_process';
import fs from 'fs';
import { generateTestWithExample } from './generate-test-with-example';
import { updateIndex } from './update-index';

// List of control components to generate field wrappers for
const CONTROLS = [
    'input-phone',
    'checkbox-group',
    'radio-group',
    'date-picker',
    'select',
    'input-number',
    'input',
    'textarea',
];

// Set to true to overwrite existing components - be careful with this!
const FORCE = false;

function main() {
    CONTROLS.map(buildFieldComponentForControl);

    updateIndex();
}

main();

function buildFieldComponentForControl(componentSlug: string) {
    // ensure component slug is formatted correctly
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(componentSlug)) {
        console.error(`Component slug "${componentSlug}" is not formatted correctly.`);
        process.exit(1);
    }

    const fieldComponentSlug = `${componentSlug}-field`;

    if (fs.existsSync(`./projects/ui/src/lib/${fieldComponentSlug}`)) {
        if (!FORCE) {
            console.info(`\x1b[33mSkipping "${fieldComponentSlug}" component; folder already exists.\x1b[0m`);
            return;
        } else {
            console.info(`\x1b[33mOverwriting "${fieldComponentSlug}" component.\x1b[0m`);
        }
    }

    const componentName = componentSlug
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    const fieldComponentName = `${componentName}Field`;
    const componentClassName = `UI${componentName}`;
    const fieldComponentClassName = `UI${fieldComponentName}`;

    // create component directory
    execSync(`mkdir -p ./projects/ui/src/lib/${fieldComponentSlug}`, { stdio: 'inherit' });

    generateComponentFile(
        componentClassName,
        componentSlug,
        fieldComponentClassName,
        fieldComponentSlug,
        fieldComponentName,
    );

    generateTestWithExample(fieldComponentSlug);

    generateIndexFile(fieldComponentSlug);

    execSync(`npx prettier --write ./projects/ui/src/lib/${fieldComponentSlug}`, { stdio: 'inherit' });
    execSync(`npx eslint --fix ./projects/ui/src/lib/${fieldComponentSlug}`, { stdio: 'inherit' });

    console.info(`\x1b[32mGenerated "${fieldComponentSlug}" component.\x1b[0m`);
}

function generateComponentFile(
    componentClassName: string,
    componentFileName: string,
    fieldComponentClassName: string,
    fieldComponentFileName: string,
    fieldComponentName: string,
) {
    const content = `import { Component, computed, input, ViewEncapsulation } from '@angular/core';
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
                [ariaLabelledBy]="labelledById()"
                [ariaDescribedBy]="describedById()"
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
    fs.writeFileSync(path, content, 'utf8');
}

function generateIndexFile(componentFileName: string) {
    const newIndexPath = `./projects/ui/src/lib/${componentFileName}/index.ts`;
    fs.writeFileSync(newIndexPath, `export * from './${componentFileName}';`, 'utf8');
}
