import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-view-list',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ViewList"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M120-280v-400q0-33 23.5-56.5T200-760h560q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H200q-33 0-56.5-23.5T120-280Zm80-320h80v-80h-80v80Zm160 0h400v-80H360v80Zm0 160h400v-80H360v80Zm0 160h400v-80H360v80Zm-160 0h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
    </svg>`,
    styles: ['icon-view-list { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconViewList {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
