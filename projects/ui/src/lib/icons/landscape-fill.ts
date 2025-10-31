import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-landscape-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="LandscapeFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="m88-304 160-213q6-8 14.5-12t17.5-4q9 0 17.5 4t14.5 12l136 181q6 8 14 12t18 4q25 0 36-22.5t-4-42.5l-84-111q-8-11-8-24t8-24l100-133q6-8 14.5-12t17.5-4q9 0 17.5 4t14.5 12l280 373q15 20 4 42t-36 22H120q-25 0-36-22t4-42Z"
        />
    </svg>`,
    styles: ['icon-landscape-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLandscapeFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
