import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-nigeria',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagNigeria"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagNigeria__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path d="M1.5 5H8.5V19H1.5V5ZM15.5 5H22.5V19H15.5V5Z" fill="#007B23" />
        </g>
        <defs>
            <clipPath id="SvgFlagNigeria__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-nigeria { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagNigeria {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
