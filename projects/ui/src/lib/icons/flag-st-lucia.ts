import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-st-lucia',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagStLucia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagStLucia__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#55B2FF" />
            <path d="M7.57892 17.203H16.421L12 6.79712L7.57892 17.203Z" fill="#F3F3F3" />
            <path d="M9.11401 16.1631L12 9.60107L14.8859 16.1631H9.11401Z" fill="#333333" />
            <path d="M7.57892 17.203H16.421L12 13.0398L7.57892 17.203Z" fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgFlagStLucia__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-st-lucia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagStLucia {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
