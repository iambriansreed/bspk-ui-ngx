import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '@ui/utils/send-snackbar';
import { UIInputPhone } from './input-phone';

@Component({
    selector: 'ui-input-phone-example',
    standalone: true,
    imports: [CommonModule, UIInputPhone],
    template: `
        <h4>Default: valueChange, name</h4>
        <ui-input-phone (valueChange)="update('default', $event)" name="default-input-phone" />

        <h4>Disabled: valueChange, name, disabled</h4>
        <ui-input-phone (valueChange)="update('disabled', $event)" name="disabled-input-phone" [disabled]="true" />

        <h4>Invalid: valueChange, name, invalid</h4>
        <ui-input-phone (valueChange)="update('invalid', $event)" name="invalid-input-phone" [invalid]="true" />

        <h4>Required: valueChange, name, required</h4>
        <ui-input-phone (valueChange)="update('required', $event)" name="required-input-phone" [required]="true" />

        <h4>Read Only: valueChange, name, readOnly, value</h4>
        <ui-input-phone
            (valueChange)="update('read-only', $event)"
            name="read-only-input-phone"
            [readOnly]="true"
            value="1235556789" />

        <h4>Different Country Code: valueChange, name, initialCountryCode</h4>
        <ui-input-phone
            (valueChange)="update('country', $event)"
            name="country-input-phone"
            [initialCountryCode]="'GB'" />

        <h4>Disable Formatting: valueChange, name, disableFormatting</h4>
        <ui-input-phone
            (valueChange)="update('Disabled Formatting', $event)"
            name="unformatted-input-phone"
            [disableFormatting]="true" />

        <h4>Multiple props: valueChange, name, value, ariaLabel, id, disabledFormatting, ariaErrorMessage</h4>
        <ui-input-phone
            (valueChange)="update('Multiple props', $event)"
            name="multiple-props-phone"
            value="235556789"
            [id]="'multiple-props-phone'"
            ariaLabel="Phone Number of disabled formatting example"
            [disableFormatting]="true"
            ariaErrorMessage="error message example" />
        <div id="error message example">This is an example of aria-errormessage text.</div>

        <h4>aria-describedby</h4>
        <ui-input-phone
            (valueChange)="update('Disabled Formatting', $event)"
            name="aria-describedby-example"
            ariaDescribedBy="described-by-example"
            [id]="'aria-describedby-example'" />
        <div id="described-by-example">This is an example of aria-describedby text.</div>

        <h4>Different Sizes</h4>
        <p>Small: valueChange, name, size</p>
        <ui-input-phone (valueChange)="update('Small', $event)" name="small-input-phone" [size]="'small'" />

        <p>Medium: valueChange, name, size</p>
        <ui-input-phone (valueChange)="update('Medium', $event)" name="medium-input-phone" [size]="'medium'" />

        <p>Large: valueChange, name, size</p>
        <ui-input-phone (valueChange)="update('Large', $event)" name="large-input-phone" [size]="'large'" />
    `,
})
export class UIInputPhoneExample {
    update(key: string, value: string | undefined): void {
        sendSnackbar(`Updated ${key} | value: ${value ?? ''}`);
    }
}
