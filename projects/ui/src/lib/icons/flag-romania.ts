import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-romania',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagRomania"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagRomania__a)">
            <path d="M1.5 5H22.4591V19H1.5V5Z" fill="#FFDA44" />
            <path d="M15.5 5H22.5V19H15.5V5Z" fill="#D80027" />
            <path d="M1.5 5H8.5V19H1.5V5Z" fill="#0052B4" />
        </g>
        <defs>
            <clipPath id="SvgFlagRomania__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-romania { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagRomania {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
