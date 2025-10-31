import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-bahrain',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagBahrain"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagBahrain__a)">
            <path d="M1.49896 5H22.501V19H1.49896V5Z" fill="#D80027" />
            <path
                d="M10.6381 6.40697L7.14326 7.80984L10.6381 9.20861L7.14326 10.6074L10.6381 12.0062L7.14326 13.4049L10.6381 14.8037L7.14326 16.2025L10.6381 17.6012L7.14326 19H1.49896V5H7.14326L10.6381 6.40697Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagBahrain__a">
                <rect width="21.0021" height="14" fill="white" transform="translate(1.49896 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-bahrain { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBahrain {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
