import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconAccountCircle, IconHome, IconSearch } from '../icons';
import { UISegmentedControl } from './segmented-control';

@Component({
    selector: 'ui-segmented-control-example',
    standalone: true,
    imports: [CommonModule, UISegmentedControl],
    template: `
        <h3>SegmentedControl</h3>
        <ui-segmented-control
            [label]="'Segments'"
            [options]="options"
            [value]="selected"
            (valueChange)="selected = $event" />
        <p>Selected: {{ selected }}</p>

        <h3>Icons Only</h3>
        <ui-segmented-control
            [label]="'Segments Icons'"
            [options]="iconOptions"
            [value]="selectedIcon"
            [iconsOnly]="true"
            (valueChange)="selectedIcon = $event" />
        <p>Selected: {{ selectedIcon }}</p>

        <h3>With Disabled Option</h3>
        <ui-segmented-control
            [label]="'Segments with Disabled'"
            [options]="optionsWithDisabled"
            [value]="selected"
            (valueChange)="selected = $event" />
        <p>Selected: {{ selected }}</p>
    `,
})
export class UISegmentedControlExample {
    options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
    ];

    iconOptions = [
        { value: '1', label: 'Home', icon: IconHome },
        { value: '2', label: 'Search', icon: IconSearch },
        { value: '3', label: 'Profile', icon: IconAccountCircle },
        { value: '4', label: 'Option 4' },
    ] as any;

    optionsWithDisabled = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
    ];

    selected = '1';
    selectedIcon = '3';
}
