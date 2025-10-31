import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-netherlands',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagNetherlands"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagNetherlands__a)">
            <path d="M1.5 9.66675H22.5V14.3334H1.5V9.66675Z" fill="white" />
            <path d="M1.5 5H22.5V9.66667H1.5V5Z" fill="#CD1F2A" />
            <path d="M1.5 14.3333H22.5V18.9999H1.5V14.3333Z" fill="#1D4185" />
        </g>
        <defs>
            <clipPath id="SvgFlagNetherlands__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-netherlands { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagNetherlands {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
