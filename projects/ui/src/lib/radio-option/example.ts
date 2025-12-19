import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/sendSnackbar';
import { UIRadioOption } from './radio-option';

@Component({
    selector: 'ui-radio-option-example',
    standalone: true,
    imports: [CommonModule, UIRadioOption],
    template: `
        <h2>Radio Option</h2>
        @for (ex of examples; track $index) {
            <h3>{{ ex.label }}</h3>
            <ui-radio-option
                [label]="'This is ' + ex.label"
                [description]="'This is description for ' + ex.label"
                [id]="ex.id"
                [name]="ex.name || 'example-radio-group'"
                [value]="ex.value || ex.label || 'option' + $index"
                [checked]="ex.checked"
                [disabled]="ex.disabled"
                [invalid]="ex.invalid"
                [required]="ex.required"
                [ariaLabel]="ex.ariaLabel"
                (checkedChange)="onCheckedChange($index, $event)"
                (change)="radioOptionChange($index)" />
        }
    `,
})
export class UIRadioOptionExample {
    // Option-specific config

    examples: (Partial<{
        label: string;
        description: string;
        name: string;
        value: string;
        checked: boolean;
        disabled: boolean;
        invalid: boolean;
        required: boolean;
        ariaLabel: string;
    }> & { id: string })[] = [
        {
            label: 'basic',
        },
        {
            label: 'checked = true',
            checked: true,
        },
        {
            label: 'checked = true, disabled = true',
            checked: true,
            disabled: true,
        },
        {
            label: 'disabled = true',
            disabled: true,
        },
        {
            label: 'checked = true, invalid = true',
            checked: true,
            invalid: true,
        },
        {
            label: 'invalid = true',
            invalid: true,
        },
        {
            label: 'required = true',
            required: true,
        },
        {
            label: 'required = false',
            required: false,
        },
        {
            label: 'disabled = true, invlaid = true',
            invalid: true,
            disabled: true,
        },
        {
            label: 'checked = true, disabled = true, invlaid = true',
            invalid: true,
            disabled: true,
            checked: true,
        },
    ].map((config, idx) => ({
        id: `radio-option-example-${idx}`,
        name: `example-radio-group-${idx}`,
        value: `option-${idx}`,
        ...config,
    }));

    radioOptionChange(idx: number) {
        return () => this.onCheckedChange(idx, !this.examples[idx].checked);
    }

    onCheckedChange(idx: number, checked: boolean) {
        this.examples[idx].checked = checked;
        sendSnackbar(`Radio ${idx} checked: ${checked}`);
    }
}
