import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-russia',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagRussia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagRussia__a)">
            <path d="M1.5 4.99976V18.9997H22.5V4.99976H1.5Z" fill="white" />
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#0052B4" />
            <path d="M1.5 5H22.5V9.66656H1.5V5Z" fill="white" />
            <path d="M1.5 14.3333H22.5V18.9998H1.5V14.3333Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagRussia__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-russia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagRussia {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
