import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-credit-card-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="CreditCardFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-320h640v-160H160v160Z"
        />
    </svg>`,
    styles: ['icon-credit-card-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconCreditCardFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
