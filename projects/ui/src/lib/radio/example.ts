import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIRadio } from './radio';

@Component({
    selector: 'ui-radio-example',
    standalone: true,
    imports: [CommonModule, UIRadio],
    template: `
        <h2>Radio</h2>

        <h3>Basic with id</h3>
        <ui-radio id="test-id" name="radio-0" ariaLabel="Option 0" value="Option 0"></ui-radio>

        <h3>checked = true</h3>
        <ui-radio name="radio-1" ariaLabel="Option 1" value="Option 1" [checked]="true"></ui-radio>

        <h3>checked = false</h3>
        <ui-radio name="radio-2" ariaLabel="Option 2" value="Option 2" [checked]="false"></ui-radio>

        <h3>checked = true, disabled = true</h3>
        <ui-radio name="radio-3" ariaLabel="Option 3" value="Option 3" [checked]="true" [disabled]="true"></ui-radio>

        <h3>checked = false, disabled = true</h3>
        <ui-radio name="radio-4" ariaLabel="Option 4" value="Option 4" [checked]="false" [disabled]="true"></ui-radio>

        <h3>checked = true, invalid = true</h3>
        <ui-radio name="radio-5" ariaLabel="Option 5" value="Option 5" [checked]="true" [invalid]="true"></ui-radio>

        <h3>checked = false, invalid = true</h3>
        <ui-radio name="radio-6" ariaLabel="Option 6" value="Option 6" [checked]="false" [invalid]="true"></ui-radio>
    `,
})
export class UIRadioExample {}
