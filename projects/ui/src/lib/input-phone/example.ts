import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { UIInputPhone } from './input-phone';

@Component({
    selector: 'ui-input-phone-example',
    standalone: true,
    imports: [CommonModule, UIInputPhone],
    template: `
        <h4>Default</h4>
        <ui-input-phone
            [value]="values()['default']"
            (valueChange)="update('default', $event)"
            id="default-input-phone"
            name="default-input-phone"
            ariaLabel="Phone Number"
            initialCountryCode="US" />

        <h4>Disabled</h4>
        <ui-input-phone
            name="disabled-input-phone"
            ariaLabel="Phone Number"
            [disabled]="true"
            initialCountryCode="US" />

        <h4>Invalid</h4>
        <ui-input-phone name="invalid-input-phone" ariaLabel="Phone Number" [invalid]="true" initialCountryCode="US" />

        <h4>Required</h4>
        <ui-input-phone
            name="required-input-phone"
            ariaLabel="Phone Number"
            [required]="true"
            initialCountryCode="US" />

        <h4>Read Only</h4>
        <ui-input-phone
            name="read-only-input-phone"
            ariaLabel="Phone Number"
            [readOnly]="true"
            initialCountryCode="US"
            value="+1234567890" />

        <h4>Different Country Code</h4>
        <ui-input-phone
            [value]="values()['country']"
            (valueChange)="update('country', $event)"
            id="country-input-phone"
            name="country-input-phone"
            ariaLabel="Phone Number"
            initialCountryCode="GB" />

        <h4>Disable Formatting</h4>
        <ui-input-phone
            [value]="values()['unformatted']"
            (valueChange)="update('unformatted', $event)"
            id="unformatted-input-phone"
            name="unformatted-input-phone"
            ariaLabel="Phone Number"
            [disableFormatting]="true"
            initialCountryCode="US" />

        <h4>Different Sizes</h4>
        <p>Small:</p>
        <ui-input-phone name="small-input-phone" ariaLabel="Phone Number" [size]="'small'" initialCountryCode="US" />

        <p>Medium:</p>
        <ui-input-phone name="medium-input-phone" ariaLabel="Phone Number" [size]="'medium'" initialCountryCode="US" />

        <p>Large:</p>
        <ui-input-phone name="large-input-phone" ariaLabel="Phone Number" [size]="'large'" initialCountryCode="US" />
    `,
})
export class UIInputPhoneExample {
    readonly values = signal({
        default: '',
        country: '',
        unformatted: '',
    });

    update(key: string, value: string | undefined): void {
        this.values.update((current) => ({
            ...current,
            [key]: value || '',
        }));
    }
}
