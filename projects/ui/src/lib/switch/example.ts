import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UISwitch } from './switch';

@Component({
    selector: 'ui-switch-example',
    standalone: true,
    imports: [CommonModule, UISwitch],
    template: `
        @for (ex of examples; track $index) {
            <h4>{{ ex.label }}</h4>
            <ui-switch
                [id]="ex.id"
                [name]="ex.name"
                [ariaLabel]="ex.ariaLabel"
                [value]="ex.value"
                [checked]="ex.checked"
                [disabled]="ex.disabled"
                (checkedChange)="onCheckedChange($index, !!$event)">
            </ui-switch>
            <div>Demo checked: {{ ex.checked }}</div>
        }
    `,
})
export class UISwitchExample {
    examples = [
        {
            label: 'Basic with id',
            id: 'test-id',
            name: 'switch-0',
            ariaLabel: 'Switch 0',
            value: 'Switch 0',
            checked: false,
        },
        {
            label: 'checked = true',
            id: 'switch-1',
            name: 'switch-1',
            ariaLabel: 'Switch 1',
            value: 'Switch 1',
            checked: true,
        },
        {
            label: 'checked = false',
            id: 'switch-2',
            name: 'switch-2',
            ariaLabel: 'Switch 2',
            value: 'Switch 2',
            checked: false,
        },
        {
            label: 'checked = true, disabled = true',
            id: 'switch-3',
            name: 'switch-3',
            ariaLabel: 'Switch 3',
            value: 'Switch 3',
            checked: true,
            disabled: true,
        },
        {
            label: 'checked = false, disabled = true',
            id: 'switch-4',
            name: 'switch-4',
            ariaLabel: 'Switch 4',
            value: 'Switch 4',
            checked: false,
            disabled: true,
        },
    ];

    onCheckedChange(idx: number, checked: boolean) {
        this.examples[idx].checked = checked;
        sendSnackbar(`Switch ${idx} checked: ${checked}`);
    }
}
