import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UICheckbox } from './checkbox';

@Component({
    selector: 'ui-checkbox-example',
    standalone: true,
    imports: [CommonModule, UICheckbox],
    template: `
        <h2>Checkbox</h2>

        <h3>Basic with id</h3>
        <ui-checkbox
            id="test-id"
            name="checkbox-0"
            ariaLabel="Option 0"
            value="Option 0"
            [checked]="checked['checkbox-0']"
            (checkedChange)="setChecked('checkbox-0', $event)" />

        <h3>checked = {{ checked['checkbox-1'] }}</h3>
        <ui-checkbox
            name="checkbox-1"
            ariaLabel="Option 1"
            value="Option 1"
            [checked]="checked['checkbox-1']"
            (checkedChange)="setChecked('checkbox-1', $event)" />

        <h3>checked = {{ checked['checkbox-2'] }}</h3>
        <ui-checkbox
            name="checkbox-2"
            ariaLabel="Option 2"
            value="Option 2"
            [checked]="checked['checkbox-2']"
            (checkedChange)="setChecked('checkbox-2', $event)" />

        <h3>checked = {{ checked['checkbox-3'] }}, disabled = true</h3>
        <ui-checkbox
            name="checkbox-3"
            ariaLabel="Option 3"
            value="Option 3"
            [disabled]="true"
            [checked]="checked['checkbox-3']"
            (checkedChange)="setChecked('checkbox-3', $event)" />

        <h3>checked = {{ checked['checkbox-4'] }}, disabled = true</h3>
        <ui-checkbox
            name="checkbox-4"
            ariaLabel="Option 4"
            value="Option 4"
            [disabled]="true"
            [checked]="checked['checkbox-4']"
            (checkedChange)="setChecked('checkbox-4', $event)" />

        <h3>checked = {{ checked['checkbox-5'] }}, invalid = true</h3>
        <ui-checkbox
            name="checkbox-5"
            ariaLabel="Option 5"
            value="Option 5"
            [invalid]="true"
            [checked]="checked['checkbox-5']"
            (checkedChange)="setChecked('checkbox-5', $event)" />

        <h3>checked = {{ checked['checkbox-6'] }} , invalid = true</h3>
        <ui-checkbox
            name="checkbox-6"
            ariaLabel="Option 6"
            value="Option 6"
            [invalid]="true"
            [checked]="checked['checkbox-6']"
            (checkedChange)="setChecked('checkbox-6', $event)" />

        <h3>checked = {{ checked['checkbox-7'] }}, required = true</h3>
        <ui-checkbox
            name="checkbox-7"
            ariaLabel="Option 7"
            value="Option 7"
            [required]="true"
            [checked]="checked['checkbox-7']"
            (checkedChange)="setChecked('checkbox-7', $event)" />

        <h3>checked = {{ checked['checkbox-8'] }}, required = true</h3>
        <ui-checkbox
            name="checkbox-8"
            ariaLabel="Option 8"
            value="Option 8"
            [required]="true"
            [checked]="checked['checkbox-8']"
            (checkedChange)="setChecked('checkbox-8', $event)" />

        <h3>
            indeterminate =
            <button
                style="font: inherit; border: none; padding: 0; cursor: pointer;"
                (click)="toggleIndeterminate('checkbox-9')">
                {{ indeterminate['checkbox-9'] }}</button
            >, checked = {{ checked['checkbox-9'] }}
        </h3>
        <ui-checkbox
            name="checkbox-9"
            ariaLabel="Option 9"
            value="Option 9"
            [indeterminate]="indeterminate['checkbox-9']"
            [checked]="checked['checkbox-9']"
            (checkedChange)="setChecked('checkbox-9', $event)" />

        <h3>
            checked = {{ checked['checkbox-10'] }}, indeterminate =
            <button
                style="font: inherit; border: none; padding: 0; cursor: pointer;"
                (click)="toggleIndeterminate('checkbox-10')">
                {{ indeterminate['checkbox-10'] }}
            </button>
        </h3>
        <ui-checkbox
            name="checkbox-10"
            ariaLabel="Option 10"
            value="Option 10"
            [indeterminate]="indeterminate['checkbox-10']"
            [checked]="checked['checkbox-10']"
            (checkedChange)="setChecked('checkbox-10', $event)" />

        <h3>
            disabled = true, indeterminate =
            <button
                style="font: inherit; border: none; padding: 0; cursor: pointer;"
                (click)="toggleIndeterminate('checkbox-11')">
                {{ indeterminate['checkbox-11'] }}
            </button>
        </h3>
        <ui-checkbox
            name="checkbox-11"
            ariaLabel="Option 11"
            value="Option 11"
            [disabled]="true"
            [indeterminate]="indeterminate['checkbox-11']"
            [checked]="checked['checkbox-11']"
            (checkedChange)="setChecked('checkbox-11', $event)" />

        <h3>aria-describedby and aria-errormessage</h3>
        <div id="desc">This describes the checkbox</div>
        <div id="err">This is an error message</div>
        <ui-checkbox
            name="checkbox-12"
            ariaLabel="Option 12"
            value="Option 12"
            [ariaDescribedBy]="'desc'"
            [ariaErrorMessage]="'err'"
            [checked]="checked['checkbox-12']"
            (checkedChange)="setChecked('checkbox-12', $event)" />
    `,
})
export class UICheckboxExample {
    checked: Record<string, boolean> = {
        'checkbox-0': false,
        'checkbox-1': true,
        'checkbox-2': false,
        'checkbox-3': true,
        'checkbox-4': false,
        'checkbox-5': true,
        'checkbox-6': false,
        'checkbox-7': true,
        'checkbox-8': false,
        'checkbox-9': false,
        'checkbox-10': true,
        'checkbox-11': false,
        'checkbox-12': false,
    };

    indeterminate: Record<string, boolean> = {
        'checkbox-9': true,
        'checkbox-10': true,
        'checkbox-11': true,
    };

    setChecked(name: string, checked: boolean) {
        this.checked[name] = checked;
    }

    toggleIndeterminate(name: string) {
        this.indeterminate[name] = !this.indeterminate[name];
    }
}
