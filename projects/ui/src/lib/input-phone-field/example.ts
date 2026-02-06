import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UIInputPhoneField } from './input-phone-field';

@Component({
    selector: 'ui-input-phone-field-example',
    standalone: true,
    imports: [CommonModule, UIInputPhoneField],
    template: `
        <h4>Default</h4>
        <ui-input-phone-field
            [value]="values()['default']"
            (valueChange)="update('default', $event)"
            id="default-input"
            name="default-input"
            label="InputPhoneField Label"
            helperText="The value of the default input is: {{ values()['default'] || 'null' }}" />

        <h4>Disabled</h4>
        <ui-input-phone-field name="disabled-input" label="InputPhoneField Label" [disabled]="true" />

        <h4>Invalid</h4>
        <ui-input-phone-field name="invalid-input" label="InputPhoneField Label" [invalid]="true" />

        <h4>Required</h4>
        <ui-input-phone-field name="required-input" label="InputPhoneField Label" [required]="true" />

        <h4>Read Only</h4>
        <ui-input-phone-field name="read-only-input" label="InputPhoneField Label" [readOnly]="true" />

        <h4>size = small</h4>
        <ui-input-phone-field name="size-small" label="InputPhoneField Label" size="small" />

        <h4>size = medium</h4>
        <ui-input-phone-field name="size-medium" label="InputPhoneField Label" size="medium" />

        <h4>size = large</h4>
        <ui-input-phone-field name="size-large" label="InputPhoneField Label" size="large" />
    `,
})
export class UIInputPhoneFieldExample {
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
