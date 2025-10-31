import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-denmark',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagDenmark"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagDenmark__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#C60C30" />
            <path
                d="M9.27778 5H6.82164V10.731H1.5V13.1871H6.82164V19H9.27778V13.1871H22.5V10.731H9.27778V5Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagDenmark__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-denmark { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagDenmark {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
