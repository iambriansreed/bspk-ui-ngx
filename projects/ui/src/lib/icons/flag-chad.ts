import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-chad',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagChad"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagChad__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#FFDA44" />
            <path d="M1.5 5H8.49986V19.0002H1.5V5Z" fill="#0052B4" />
            <path d="M15.5002 5H22.5V19.0002H15.5002V5Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagChad__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-chad { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagChad {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
