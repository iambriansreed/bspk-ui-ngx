import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIRadioGroup, RadioGroupOption } from './radio-group';

@Component({
    selector: 'ui-radio-group-example',
    standalone: true,
    imports: [CommonModule, UIRadioGroup],
    template: `
        <h4>Basic</h4>
        <ui-radio-group
            name="group-basic"
            [options]="basicOptions"
            [value]="selectedBasic"
            (valueChange)="selectedBasic = $event"></ui-radio-group>
        <p>Demo output of selected: {{ selectedBasic }}</p>

        <h4>Disabled Group</h4>
        <ui-radio-group
            name="group-disabled"
            [options]="basicOptions"
            [value]="selectedDisabled"
            [disabled]="true"
            (valueChange)="selectedDisabled = $event"></ui-radio-group>
        <p>Demo output of selected: {{ selectedDisabled }}</p>

        <h4>Invalid Group</h4>
        <ui-radio-group
            name="group-invalid"
            [options]="basicOptions"
            [value]="selectedInvalid"
            [invalid]="true"
            (valueChange)="selectedInvalid = $event"></ui-radio-group>
        <p>Demo output of selected: {{ selectedInvalid }}</p>

        <h4>Required Group</h4>
        <ui-radio-group
            name="group-required"
            [options]="altOptions"
            [value]="selectedRequired"
            [required]="true"
            (valueChange)="selectedRequired = $event"></ui-radio-group>
        <p>Demo output of selected: {{ selectedRequired }}</p>

        <h4>With aria-describedby and aria-errormessage</h4>
        <div id="desc">This describes the group</div>
        <div id="err">This is an error message</div>
        <ui-radio-group
            name="group-aria"
            [options]="basicOptions"
            [value]="selectedAria"
            [ariaDescribedBy]="'desc'"
            [ariaErrorMessage]="'err'"
            (valueChange)="selectedAria = $event"></ui-radio-group>
        <p>Demo output of selected: {{ selectedAria }}</p>

        <h4>Options with individual disabled/checked/description</h4>
        <ui-radio-group
            name="group-mixed"
            [options]="mixedOptions"
            [value]="selectedMixed"
            (valueChange)="selectedMixed = $event"></ui-radio-group>
        <p>Demo output of selected: {{ selectedMixed }}</p>
    `,
})
export class UIRadioGroupExample {
    basicOptions: RadioGroupOption[] = [
        { value: '1', label: 'Option 1', description: 'First option' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    altOptions: RadioGroupOption[] = [
        { value: 'A', label: 'Option A', description: 'First option' },
        { value: 'B', label: 'Option B', description: 'Second option' },
        { value: 'C', label: 'Option C', description: 'Third option' },
    ];

    mixedOptions: RadioGroupOption[] = [
        { value: 'a', label: 'Checked by default', checked: true },
        { value: 'b', label: 'Disabled', disabled: true },
        { value: 'c', label: 'With description', description: 'Extra info' },
        { value: 'd', label: 'Normal' },
    ];

    selectedBasic: string | undefined = '1';
    selectedDisabled: string | undefined = '2';
    selectedInvalid: string | undefined = '3';
    selectedRequired: string | undefined = 'C';
    selectedAria: string | undefined = '2';
    selectedMixed: string | undefined = 'a';
}
