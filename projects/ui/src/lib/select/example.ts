import { Component } from '@angular/core';
import { UIField } from '../field/field';
import { SelectOption, UISelect } from './select';

@Component({
    selector: 'ui-select-example',
    standalone: true,
    imports: [UISelect, UIField],
    template: `
        <h4>Select</h4>
        <ui-field
            [controlId]="'example-select'"
            [helperText]="'The select allows you to choose one option.'"
            [label]="'Select an option'">
            <ui-select
                [id]="'example-select'"
                [name]="'example-select'"
                [items]="OPTIONS"
                [placeholder]="'Select an option'"
                [scrollLimit]="5"
                [size]="'medium'"
                [(value)]="selected">
            </ui-select>
        </ui-field>
    `,
})
export class UISelectExample {
    OPTIONS: SelectOption[] = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
        { label: 'Option 5', value: '5' },
        { label: 'Option 6', value: '6' },
        { label: 'Option 7', value: '7' },
        { label: 'Option 8', value: '8' },
        { label: 'Option 9', value: '9' },
        { label: 'Option 10', value: '10' },
        { label: 'Option 11', value: '11' },
        { label: 'Option 12', value: '12' },
    ];
    selected: string | undefined = undefined;
}
