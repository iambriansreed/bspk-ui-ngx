import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-tablet',
    template: `<svg
        [style.width]="width"
        data-bspk-name="Tablet"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M120-160q-33 0-56.5-23.5T40-240v-480q0-33 23.5-56.5T120-800h720q33 0 56.5 23.5T920-720v480q0 33-23.5 56.5T840-160H120Zm40-560h-40v480h40v-480Zm80 480h480v-480H240v480Zm560-480v480h40v-480h-40Zm0 0h40-40Zm-640 0h-40 40Z"
        />
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTablet {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
