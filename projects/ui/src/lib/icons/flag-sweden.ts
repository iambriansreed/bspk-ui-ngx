import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-sweden',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagSweden"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagSweden__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#0052B4" />
            <path
                d="M9.37501 4.99976H6.75001V10.6872H1.5V13.3122H6.75001V18.9997H9.37501V13.3122H22.5V10.6872H9.37501V4.99976Z"
                fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgFlagSweden__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-sweden { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagSweden {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
