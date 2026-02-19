import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UIInputField } from './input-field';

@Component({
    selector: 'ui-input-example',
    standalone: true,
    imports: [CommonModule, UIInputField],
    template: `
        <h4>Default</h4>
        <ui-input-field
            [value]="values()['default']"
            (valueChange)="update('default', $event)"
            [id]="'default-input'"
            name="default-input"
            label="Input Label"
            helperText="The value of the default input is: {{ values()['default'] || 'null' }}" />

        <h4>Disabled</h4>
        <ui-input-field name="disabled-input" label="Input Label" [disabled]="true" />

        <h4>Invalid</h4>
        <ui-input-field name="invalid-input" label="Input Label" [invalid]="true" />

        <h4>Required</h4>
        <ui-input-field name="required-input" label="Input Label" [required]="true" />

        <h4>Read Only</h4>
        <ui-input-field name="read-only-input" label="Input Label" [readOnly]="true" />

        <h4>showClearButton = true</h4>
        <ui-input-field name="show-clear-button-true" label="Input Label" [showClearButton]="true" />

        <h4>showClearButton = false</h4>
        <ui-input-field name="show-clear-button-false" label="Input Label" [showClearButton]="false" />

        <h4>Placeholder</h4>
        <ui-input-field name="placeholder-input" label="Input Label" placeholder="I am placeholder copy" />

        <h4>size = small</h4>
        <ui-input-field name="size-small" label="Input Label" size="small" />

        <h4>size = medium</h4>
        <ui-input-field name="size-medium" label="Input Label" size="medium" />

        <h4>size = large</h4>
        <ui-input-field name="size-large" label="Input Label" size="large" />

        <h4>type: text</h4>
        <ui-input-field name="type-text" label="Input Label" type="text" />

        <h4>type: number</h4>
        <ui-input-field name="type-number" label="Input Label" type="number" />

        <h4>type: password</h4>
        <ui-input-field name="type-password" label="Input Label" type="password" />

        <h4>leading</h4>
        <ui-input-field name="leading-example" label="Input Label" leading="$" />

        <h4>trailing</h4>
        <ui-input-field
            ariaLabel="Input Label"
            [value]="values()['trailing-example']"
            (valueChange)="update('trailing-example', $event)"
            name="trailing-example"
            label="Input Label"
            trailing="%" />
    `,
})
export class UIInputFieldExample {
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
