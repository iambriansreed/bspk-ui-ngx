import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UIInputNumber } from './input-number';

@Component({
    selector: 'ui-input-number-example',
    standalone: true,
    imports: [CommonModule, UIInputNumber],
    template: `
        <h2>Input</h2>

        <h3>Default</h3>
        <div style="width: 320px">
            <ui-input-number
                [value]="values()['default']"
                (valueChange)="update('default', $event)"
                id="default-input"
                name="default-input"
                ariaLabel="Input Label" />
        </div>

        <h3>Disabled</h3>
        <div style="width: 320px">
            <ui-input-number
                [value]="values()['default']"
                (valueChange)="update('default', $event)"
                name="disabled-input"
                ariaLabel="Input Label"
                [disabled]="true" />
        </div>

        <h3>Invalid</h3>
        <div style="width: 320px">
            <ui-input-number
                [value]="values()['default']"
                (valueChange)="update('default', $event)"
                name="invalid-input"
                ariaLabel="Input Label"
                [invalid]="true" />
        </div>

        <h3>Required</h3>
        <div style="width: 320px">
            <ui-input-number
                [value]="values()['default']"
                (valueChange)="update('default', $event)"
                name="required-input"
                ariaLabel="Input Label"
                [required]="true" />
        </div>

        <h3>Read Only</h3>
        <div style="width: 320px">
            <ui-input-number
                (valueChange)="update('default', $event)"
                [value]="values()['default']"
                name="read-only-input"
                ariaLabel="Input Label"
                [readOnly]="true" />
        </div>
    `,
})
export class UIInputNumberExample {
    readonly values = signal<Record<string, string | undefined>>({
        default: '0',
        'value-example': '1',
    });

    readonly defaultValue = signal<string | undefined>('0');

    update = (key: string, next: string | undefined) => {
        this.values.update((current) => ({
            ...current,
            [key]: next,
        }));
    };
}
