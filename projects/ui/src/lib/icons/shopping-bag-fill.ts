import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-shopping-bag-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ShoppingBagFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm160-640h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720Zm200 200q17 0 28.5-11.5T640-560v-80h-80v80q0 17 11.5 28.5T600-520Zm-240 0q17 0 28.5-11.5T400-560v-80h-80v80q0 17 11.5 28.5T360-520Z"
        />
    </svg>`,
    styles: ['icon-shopping-bag-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconShoppingBagFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
