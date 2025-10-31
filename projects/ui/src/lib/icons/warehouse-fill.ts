import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-warehouse-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="WarehouseFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M80-200v-426q0-25 13.5-45t36.5-29l320-128q14-6 30-6t30 6l320 128q23 9 36.5 29t13.5 45v426q0 33-23.5 56.5T800-120H640v-320H320v320H160q-33 0-56.5-23.5T80-200Zm280 80v-80h80v80h-80Zm80-120v-80h80v80h-80Zm80 120v-80h80v80h-80Z"
        />
    </svg>`,
    styles: ['icon-warehouse-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconWarehouseFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
