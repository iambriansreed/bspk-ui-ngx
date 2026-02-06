import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { sendSnackbar } from '@ui/utils/send-snackbar';
import { UIInputNumber } from './input-number';

@Component({
    selector: 'ui-input-number-example',
    standalone: true,
    imports: [CommonModule, UIInputNumber],
    template: `
        <h4>Default</h4>
        <ui-input-number
            (valueChange)="update('default', $event)"
            id="default-input"
            name="default-input"
            ariaLabel="Input Label" />
        <div>valueChange, id, name, ariaLabel</div>

        <h4>max = 5</h4>
        <ui-input-number
            [value]="values()['max']"
            (valueChange)="update('max', $event)"
            [max]="5"
            id="max-input"
            name="max-input"
            ariaLabel="Input Label" />

        <h4>min = 7</h4>
        <ui-input-number
            [value]="values()['min']"
            (valueChange)="update('min', $event)"
            [min]="7"
            id="min-input"
            name="min-input"
            ariaLabel="Input Label" />

        <h4>min = 4, max = 52, step = 4</h4>
        <ui-input-number
            [value]="values()['minMax']"
            (valueChange)="update('minMax', $event)"
            [min]="4"
            [max]="52"
            [step]="4"
            id="min-max-input"
            name="min-max-input"
            ariaLabel="Input Label" />

        <h4>Align Left</h4>
        <ui-input-number
            [value]="values()['left']"
            (valueChange)="update('left', $event)"
            [align]="'left'"
            id="left-input"
            name="left-input"
            ariaLabel="Input Label" />

        <h4>Disabled</h4>
        <ui-input-number
            [value]="values()['disabled']"
            (valueChange)="update('disabled', $event)"
            name="disabled-input"
            ariaLabel="Input Label"
            [disabled]="true" />

        <h4>Invalid</h4>
        <ui-input-number
            [value]="values()['invalid']"
            (valueChange)="update('invalid', $event)"
            name="invalid-input"
            ariaLabel="Input Label"
            [invalid]="true" />

        <h4>Required</h4>
        <ui-input-number
            [value]="values()['required']"
            (valueChange)="update('required', $event)"
            name="required-input"
            ariaLabel="Input Label"
            [required]="true" />

        <h4>Read Only</h4>
        <ui-input-number
            (valueChange)="update('readOnly', $event)"
            [value]="values()['readOnly']"
            name="read-only-input"
            ariaLabel="Input Label"
            [readOnly]="true" />

        <h4>Small Size</h4>
        <ui-input-number
            [value]="values()['small']"
            (valueChange)="update('small', $event)"
            id="small-input"
            name="small-input"
            ariaLabel="Input Label"
            size="small" />

        <h4>Medium Size</h4>
        <ui-input-number
            [value]="values()['medium']"
            (valueChange)="update('medium', $event)"
            id="medium-input"
            name="medium-input"
            ariaLabel="Input Label"
            size="medium" />

        <h4>Large Size</h4>
        <ui-input-number
            [value]="values()['large']"
            (valueChange)="update('large', $event)"
            id="large-input"
            name="large-input"
            ariaLabel="Input Label"
            size="large" />

        <h4>aria-describedby</h4>
        <ui-input-number
            [value]="values()['describedBy']"
            (valueChange)="update('describedBy', $event)"
            id="aria-describedby-input"
            name="aria-describedby-input"
            ariaLabel="Input Label"
            ariaDescribedBy="described-by-example" />
        <div id="described-by-example">This is an example of aria-describedby text.</div>

        <h4>aria-errormessage</h4>
        <ui-input-number
            [value]="values()['errorMessage']"
            (valueChange)="update('errorMessage', $event)"
            id="aria-errormessage-input"
            name="aria-errormessage-input"
            ariaLabel="Input Label"
            ariaErrorMessage="error message example"
            [invalid]="true" />
        <div id="error message example">This is an example of aria-errormessage text.</div>

        <h4>step 0.25</h4>
        <ui-input-number
            [value]="values()['stepQuarter']"
            (valueChange)="update('stepQuarter', $event)"
            id="step-quarter"
            name="step-quartert"
            ariaLabel="Input Label"
            [step]="0.25" />

        <h4>step 3</h4>
        <ui-input-number
            [value]="values()['step3']"
            (valueChange)="update('step3', $event)"
            id="step-3-input"
            name="step-3-input"
            ariaLabel="Input Label"
            [step]="3" />
    `,
})
export class UIInputNumberExample {
    readonly values = signal<Record<string, string | undefined>>({
        left: '5',
    });

    readonly defaultValue = signal<string | undefined>('0');

    update = (key: string, next: string | undefined) => {
        this.values.update((current) => ({
            ...current,
            [key]: next,
        }));
        sendSnackbar(`Updated ${key}: ${next}`);
    };
}
