import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-malta',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagMalta"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagMalta__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path d="M11.9796 5H22.4796V19H11.9796V5Z" fill="#C31B28" />
            <path
                d="M5.64267 7.79177V6.35083H4.20174V7.79177H2.7608V9.2327H4.20174V10.6736H5.64267V9.2327H7.08361V7.79177H5.64267Z"
                fill="#ACABB1"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagMalta__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-malta { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagMalta {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
