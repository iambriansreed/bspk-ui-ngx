import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-gabon',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagGabon"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagGabon__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#FFDA44" />
            <path d="M1.5 5.00024H22.5V9.6668H1.5V5.00024Z" fill="#6DA544" />
            <path d="M1.5 14.3333H22.5V18.9998H1.5V14.3333Z" fill="#0052B4" />
        </g>
        <defs>
            <clipPath id="SvgFlagGabon__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-gabon { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagGabon {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
