import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIButton } from '../button';
import { UIInput } from './input';

@Component({
    selector: 'ui-input-example',
    standalone: true,
    imports: [CommonModule, UIInput, UIButton],
    template: `
        <h4>Default</h4>
        <ui-input
            name="default"
            ariaLabel="Input Label"
            [value]="valueDefault()"
            (valueChange)="valueDefault.set($event)" />

        <h4>Default with preset Value</h4>

        <ui-input
            [value]="valueDefaultPreset()"
            (valueChange)="valueDefaultPreset.set($event)"
            id="default-preset-value"
            name="default-preset-value"
            ariaLabel="Input Label" />
        <p>The value of the default input is: {{ valueDefaultPreset() || 'null' }}</p>

        <h4>Disabled</h4>
        <ui-input name="disabled-input" ariaLabel="Input Label" [disabled]="true" />

        <h4>Invalid</h4>
        <ui-input name="invalid-input" ariaLabel="Input Label" [invalid]="true" />

        <h4>Required</h4>
        <ui-input name="required-input" ariaLabel="Input Label" [required]="true" />

        <h4>Read Only</h4>
        <ui-input name="read-only-input" ariaLabel="Input Label" [readOnly]="true" />

        <h4>Read Only & preset Value</h4>
        <ui-input
            name="read-only-input"
            ariaLabel="Input Label"
            [readOnly]="true"
            (valueChange)="valueReadOnlyPreset.set($event)"
            [value]="valueReadOnlyPreset()" />

        <h4>showClearButton = true</h4>
        <p>The clear button will only show when there is a value present.</p>
        <ui-input name="show-clear-button-true" ariaLabel="Input Label" [showClearButton]="true" />

        <h4>showClearButton = false</h4>
        <ui-input name="show-clear-button-false" ariaLabel="Input Label" [showClearButton]="false" />

        <h4>Placeholder</h4>
        <ui-input name="placeholder-input" ariaLabel="Input Label" placeholder="I am placeholder copy" />

        <h4>size = small</h4>
        <ui-input name="size-small" ariaLabel="Input Label" size="small" />

        <h4>size = medium</h4>
        <ui-input name="size-medium" ariaLabel="Input Label" size="medium" />

        <h4>size = large</h4>
        <ui-input name="size-large" ariaLabel="Input Label" size="large" />

        <h4>type: text</h4>
        <ui-input name="type-text" ariaLabel="Input Label" type="text" />

        <h4>type: number</h4>
        <ui-input name="type-number" ariaLabel="Input Label" type="number" />

        <h4>type: password</h4>
        <ui-input name="type-password" ariaLabel="Input Label" type="password" />

        <h4>leading</h4>
        <ui-input name="leading-example" ariaLabel="Input Label" leading="$" />

        <h4>trailing</h4>
        <ui-input
            [value]="valueTrailing()"
            (valueChange)="valueTrailing.set($event)"
            name="trailing-example"
            ariaLabel="Input Label"
            trailing="%" />

        <h3>Placeholder with trailing UIButton</h3>
        <ui-input name="placeholder-trailing-button" ariaLabel="Input Label" placeholder="Type something...">
            <ui-button data-trailing label="Go" size="small" (onClick)="onTrailingButtonClick()"></ui-button>
        </ui-input>
    `,
})
export class UIInputExample {
    protected readonly valueDefault = signal<string | undefined>('');
    protected readonly valueDefaultPreset = signal<string | undefined>('I am a default value');
    protected readonly valueReadOnlyPreset = signal<string | undefined>('I am read only');
    protected readonly valueTrailing = signal<string | undefined>('');

    onTrailingButtonClick() {
        sendSnackbar('Trailing UIButton clicked!');
    }
}
