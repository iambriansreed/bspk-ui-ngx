import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-align-justify-flex-end',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="AlignJustifyFlexEnd"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M840-80q-17 0-28.5-11.5T800-120v-720q0-17 11.5-28.5T840-880q17 0 28.5 11.5T880-840v720q0 17-11.5 28.5T840-80ZM600-280q-17 0-28.5-11.5T560-320v-320q0-17 11.5-28.5T600-680h40q17 0 28.5 11.5T680-640v320q0 17-11.5 28.5T640-280h-40Zm-240 0q-17 0-28.5-11.5T320-320v-320q0-17 11.5-28.5T360-680h40q17 0 28.5 11.5T440-640v320q0 17-11.5 28.5T400-280h-40Z" />
    </svg>`,
    styles: ['icon-align-justify-flex-end { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconAlignJustifyFlexEnd {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
