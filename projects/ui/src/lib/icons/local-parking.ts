import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-local-parking',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="LocalParking"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M400-360v160q0 33-23.5 56.5T320-120q-33 0-56.5-23.5T240-200v-560q0-33 23.5-56.5T320-840h200q100 0 170 70t70 170q0 100-70 170t-170 70H400Zm0-160h128q33 0 56.5-23.5T608-600q0-33-23.5-56.5T528-680H400v160Z"
        />
    </svg>`,
    styles: ['icon-local-parking { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLocalParking {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
