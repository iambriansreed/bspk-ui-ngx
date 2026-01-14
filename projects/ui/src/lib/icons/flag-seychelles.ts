import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-seychelles',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagSeychelles"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagSeychelles__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="white" />
            <path d="M11.1573 5.00024L1.5 19L19.0278 5.00024H11.1573Z" fill="#FFDA44" />
            <path d="M22.5 15.0103L1.5 18.9998H22.5V15.0103Z" fill="#6DA544" />
            <path d="M22.5 5.00024H19.0278L1.5 19L22.5 10.6118V5.00024Z" fill="#D80027" />
            <path d="M1.5 5.00024V19L11.1573 5.00024H1.5Z" fill="#0052B4" />
        </g>
        <defs>
            <clipPath id="SvgFlagSeychelles__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-seychelles { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagSeychelles {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
