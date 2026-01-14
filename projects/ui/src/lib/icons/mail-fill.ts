import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-mail-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="MailFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-287q5 0 10.5-1.5T501-453l283-177q8-5 12-12.5t4-16.5q0-20-17-30t-35 1L480-520 212-688q-18-11-35-.5T160-659q0 10 4 17.5t12 11.5l283 177q5 3 10.5 4.5T480-447Z" />
    </svg>`,
    styles: ['icon-mail-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconMailFill {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
