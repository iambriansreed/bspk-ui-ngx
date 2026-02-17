import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UICheckboxOption } from './checkbox-option';

@Component({
    selector: 'ui-checkbox-option-example',
    standalone: true,
    imports: [CommonModule, UICheckboxOption],
    template: `
        @for (ex of examples; track $index) {
            <h4>{{ ex.label }}</h4>
            <ui-checkbox-option
                [label]="'This is ' + (ex.label ?? '')"
                [description]="'This is description for ' + (ex.label ?? '')"
                [id]="ex.id"
                [name]="ex.name ?? 'example-checkbox-group'"
                [value]="ex.value ?? ex.label ?? 'option' + $index"
                [checked]="ex.checked ?? false"
                [disabled]="ex.disabled ?? false"
                [invalid]="ex.invalid ?? false"
                [required]="ex.required ?? false"
                [ariaLabel]="ex.ariaLabel ?? undefined"
                (checkedChange)="onCheckedChange($index, $event)" />
        }
    `,
})
export class UICheckboxOptionExample {
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
            label: 'disabled = true, invalid = true',
            invalid: true,
            disabled: true,
        },
        {
            label: 'checked = true, disabled = true, invalid = true',
            invalid: true,
            disabled: true,
            checked: true,
        },
    ].map((config, idx) => ({
        id: `checkbox-option-example-${idx}`,
        name: `example-checkbox-group-${idx}`,
        value: `option-${idx}`,
        ...config,
    }));

    onCheckedChange(idx: number, checked: boolean | undefined) {
        this.examples[idx].checked = !!checked;
        sendSnackbar(`Checkbox ${idx} checked: ${checked}`);
    }
}
