import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-yemen',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagYemen"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagYemen__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="white" />
            <path d="M1.5 5.00024H22.5V9.6668H1.5V5.00024Z" fill="#D80027" />
            <path d="M1.5 14.3333H22.5V18.9998H1.5V14.3333Z" fill="black" />
        </g>
        <defs>
            <clipPath id="SvgFlagYemen__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-yemen { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagYemen {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
