import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-poland',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagPoland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagPoland__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="white" />
            <path d="M1.5 5.00024H22.5V12.0001H1.5V5.00024Z" fill="white" />
            <path d="M1.5 12H22.5V18.9999H1.5V12Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagPoland__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-poland { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagPoland {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
