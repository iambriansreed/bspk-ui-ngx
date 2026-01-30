import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UICheckboxGroup } from './checkbox-group';

@Component({
    selector: 'ui-checkbox-group-example',
    standalone: true,
    imports: [CommonModule, UICheckboxGroup],
    template: `
        <ui-checkbox-group
            name="basic-example"
            [options]="options"
            [value]="selectedBasic"
            (valueChange)="onBasicValueChange($event)">
        </ui-checkbox-group>
        <div>Selected: {{ selectedBasic | json }}</div>

        <ui-checkbox-group
            name="select-all-example"
            [options]="options"
            [value]="selectedAll"
            (valueChange)="onAllValueChange($event)"
            [selectAll]="true"
            [selectAllProps]="{ label: 'Select All', description: 'Select all options' }">
        </ui-checkbox-group>
        <div>Selected: {{ selectedAll | json }}</div>
    `,
})
export class UICheckboxGroupExample {
    options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    selectedBasic: string[] = [];
    selectedAll: string[] = [];

    onBasicValueChange(newValue: string[]) {
        this.selectedBasic = newValue;
    }

    onAllValueChange(newValue: string[]) {
        this.selectedAll = newValue;
    }
}
