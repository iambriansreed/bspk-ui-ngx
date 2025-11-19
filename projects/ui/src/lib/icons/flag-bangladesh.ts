import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-bangladesh',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagBangladesh"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagBangladesh__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#2D6E41" />
            <path
                d="M10.4609 16.7145C13.0608 16.7145 15.1685 14.6069 15.1685 12.0069C15.1685 9.40698 13.0608 7.29932 10.4609 7.29932C7.86096 7.29932 5.7533 9.40698 5.7533 12.0069C5.7533 14.6069 7.86096 16.7145 10.4609 16.7145Z"
                fill="#F40B32" />
        </g>
        <defs>
            <clipPath id="SvgFlagBangladesh__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-bangladesh { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBangladesh {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
