import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UISwitchOption } from './switch-option';

@Component({
    selector: 'ui-switch-option-example',
    standalone: true,
    imports: [CommonModule, UISwitchOption],
    template: `
        @for (ex of examples; track $index) {
            <h4>{{ ex.label }}</h4>
            <ui-switch-option
                [label]="'This is ' + ex.label"
                [description]="'This is description for ' + ex.label"
                [id]="ex.id"
                [name]="ex.name || 'example-switch-group'"
                [value]="ex.value || ex.label || 'option' + $index"
                [checked]="ex.checked"
                [disabled]="ex.disabled"
                [ariaLabel]="ex.ariaLabel"
                (checkedChange)="onCheckedChange($index, $event)" />
            <div>Demo checked: {{ ex.checked }}</div>
        }

        <ui-switch-option [checked]="false" label="Test Label" name="test-name" value="test-value" />
    `,
})
export class UISwitchOptionExample {
    examples: (Partial<{
        label: string;
        description: string;
        name: string;
        value: string;
        checked: boolean;
        disabled: boolean;
        ariaLabel: string;
    }> & { id: string })[] = [
        { label: 'basic' },
        { label: 'checked = true', checked: true },
        { label: 'checked = false', checked: false },
        { label: 'checked = true, disabled = true', checked: true, disabled: true },
        { label: 'disabled = true', disabled: true },
        { label: 'checked = false, disabled = true ', disabled: true, checked: false },
    ].map((config, idx) => ({
        id: `switch-option-example-${idx}`,
        name: `example-switch-group-${idx}`,
        value: `option-${idx}`,
        ...config,
    }));

    onCheckedChange(idx: number, checked: boolean) {
        this.examples[idx].checked = checked;
        sendSnackbar(`Switch ${idx} checked: ${checked}`);
    }
}
