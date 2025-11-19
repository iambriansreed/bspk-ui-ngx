import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-vertical-align-top',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="VerticalAlignTop"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M200-760q-17 0-28.5-11.5T160-800q0-17 11.5-28.5T200-840h560q17 0 28.5 11.5T800-800q0 17-11.5 28.5T760-760H200Zm280 640q-17 0-28.5-11.5T440-160v-368l-76 76q-11 11-28 11t-28-11q-11-11-11-28t11-28l144-144q6-6 13-8.5t15-2.5q8 0 15 2.5t13 8.5l144 144q11 11 11 28t-11 28q-11 11-28 11t-28-11l-76-76v368q0 17-11.5 28.5T480-120Z" />
    </svg>`,
    styles: ['icon-vertical-align-top { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconVerticalAlignTop {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
