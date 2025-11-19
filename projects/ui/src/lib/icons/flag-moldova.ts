import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-moldova',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagMoldova"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagMoldova__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#FFDA44" />
            <path d="M15.5 5H22.5V19H15.5V5Z" fill="#D80027" />
            <path d="M1.5 5H8.5V19H1.5V5Z" fill="#0052B4" />
            <path
                d="M9.94092 10.2847H11.3L11.9795 8.24609L12.659 10.2847H14.0181V14.3619L11.9795 15.725L9.94092 14.366V10.2847ZM11.3 11.6478V13.6864H12.659V11.6478H11.3Z"
                fill="#AF7F59" />
        </g>
        <defs>
            <clipPath id="SvgFlagMoldova__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-moldova { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagMoldova {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
