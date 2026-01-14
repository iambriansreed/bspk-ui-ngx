import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-title',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="Title"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M420-680H260q-25 0-42.5-17.5T200-740q0-25 17.5-42.5T260-800h440q25 0 42.5 17.5T760-740q0 25-17.5 42.5T700-680H540v460q0 25-17.5 42.5T480-160q-25 0-42.5-17.5T420-220v-460Z" />
    </svg>`,
    styles: ['icon-title { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTitle {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
