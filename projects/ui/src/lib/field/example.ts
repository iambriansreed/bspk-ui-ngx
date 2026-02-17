import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIInput } from '../input/input';
import { UIField } from './field';

@Component({
    selector: 'ui-field-example',
    standalone: true,
    imports: [CommonModule, UIField, UIInput],
    template: `
        <h4>Input with helper text</h4>
        <ui-field controlId="example-input" label="Example label" helperText="This is an example description.">
            <ui-input
                id="example-input"
                name="example-input"
                [value]="value"
                (valueChange)="valueChange($event)"
                ariaLabel="Example input"
                placeholder="Type here" />
        </ui-field>

        <h4>Input with error message and helper text</h4>
        <ui-field
            controlId="error-input"
            label="Error label"
            [errorMessage]="'This is an error message.'"
            helperText="This is an example description which should not be displayed when there is an error message.">
            <ui-input
                id="error-input"
                name="error-input"
                [value]="value"
                (valueChange)="valueChange($event)"
                ariaLabel="Error input"
                placeholder="Type here"
                [invalid]="true" />
        </ui-field>

        <h4>Required with trailing</h4>
        <ui-field controlId="req-input" label="Required label" labelTrailing="Optional info" [required]="true">
            <ui-input
                id="req-input"
                name="req-input"
                [value]="value"
                (valueChange)="valueChange($event)"
                ariaLabel="Required input"
                placeholder="Type here" />
        </ui-field>
    `,
})
export class UIFieldExample {
    value: string | undefined = '';

    valueChange = (next: string | undefined) => {
        this.value = next ?? '';
    };
}
