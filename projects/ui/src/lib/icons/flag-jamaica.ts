import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-jamaica',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagJamaica"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagJamaica__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#6DA544" />
            <path
                d="M10.3538 12.0003L1.5 17.9026V6.09741L10.3538 12.0003ZM22.5 6.09741V17.9026L13.6462 12.0003L22.5 6.09741Z"
                fill="black"
            />
            <path
                d="M22.5 6.0975L13.6462 12.0003L22.5 17.9027V19.0002H20.8543L12 13.0974L3.14575 19.0002H1.5V17.9027L10.3538 12.0003L1.5 6.0975V5H3.14575L12 10.9029L20.8543 5H22.5V6.0975Z"
                fill="#0052B4"
            />
            <path
                d="M22.5 6.0975L13.6462 12.0003L22.5 17.9027V19.0002H20.8543L12 13.0974L3.14575 19.0002H1.5V17.9027L10.3538 12.0003L1.5 6.0975V5H3.14575L12 10.9029L20.8543 5H22.5V6.0975Z"
                fill="#FFDA44"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagJamaica__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-jamaica { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagJamaica {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
