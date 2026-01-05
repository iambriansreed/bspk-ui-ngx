import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UITabGroup } from './tab-group';

@Component({
    selector: 'ui-tab-group-example',
    standalone: true,
    imports: [CommonModule, UITabGroup],
    template: `
        <h3>TabGroup Basic</h3>
        <ui-tab-group [label]="'Group'" [options]="options" [value]="selected" (valueChange)="selected = $event" />
        <p style="margin-top: var(--spacing-sizing-04);">Selected: {{ selected }}</p>

        <h3>Show Trail (hug)</h3>
        <ui-tab-group
            [label]="'Group Trail'"
            [options]="options"
            [value]="selectedTrail"
            [showTrail]="true"
            [width]="'hug'"
            (valueChange)="selectedTrail = $event" />
        <p style="margin-top: var(--spacing-sizing-04);">Selected: {{ selectedTrail }}</p>

        <h3>With Disabled Option</h3>
        <ui-tab-group
            [label]="'Segments with Disabled'"
            [options]="optionsWithDisabled"
            [value]="selected"
            (valueChange)="selected = $event" />
        <p>Selected: {{ selected }}</p>
    `,
})
export class UITabGroupExample {
    options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
    ];

    optionsWithDisabled = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' },
    ];

    selected = '1';
    selectedTrail = '2';
}
