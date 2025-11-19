import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-germany',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagGermany"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagGermany__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#D80027" />
            <path d="M1.5 5H22.5V9.66656H1.5V5Z" fill="black" />
            <path d="M1.5 14.333H22.5V18.9996H1.5V14.333Z" fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgFlagGermany__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-germany { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagGermany {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
