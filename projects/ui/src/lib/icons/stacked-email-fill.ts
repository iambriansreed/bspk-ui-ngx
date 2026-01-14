import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-stacked-email-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="StackedEmailFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M537-484q11 8 23 8t23-8l257-179v-97L560-566 280-760v97l257 179ZM120-120q-33 0-56.5-23.5T40-200v-460q0-17 11.5-28.5T80-700q17 0 28.5 11.5T120-660v460h620q17 0 28.5 11.5T780-160q0 17-11.5 28.5T740-120H120Zm160-160q-33 0-56.5-23.5T200-360v-400q0-33 23.5-56.5T280-840h560q33 0 56.5 23.5T920-760v400q0 33-23.5 56.5T840-280H280Z" />
    </svg>`,
    styles: ['icon-stacked-email-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconStackedEmailFill {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
