import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-norway',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagNorway"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagNorway__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#D80027" />
            <path
                d="M22.5 13.6358H9.79316V18.9999H6.52175V13.6358H1.5V10.3639H6.52175V4.99976H9.79316V10.3639H22.5V12.8748V13.6358Z"
                fill="white" />
            <path
                d="M22.5 11.1249V12.8748H9.03261V18.9999H7.28231V12.8748H1.5V11.1249H7.28231V4.99976H9.03261V11.1249H22.5Z"
                fill="#0052B4" />
        </g>
        <defs>
            <clipPath id="SvgFlagNorway__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-norway { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagNorway {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
