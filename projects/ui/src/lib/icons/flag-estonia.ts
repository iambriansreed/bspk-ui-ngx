import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-estonia',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagEstonia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagEstonia__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#111111" />
            <path d="M1.5 5H22.5V9.66656H1.5V5Z" fill="#368FD8" />
            <path d="M1.5 14.3335H22.5V19.0001H1.5V14.3335Z" fill="white" />
        </g>
        <defs>
            <clipPath id="SvgFlagEstonia__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-estonia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagEstonia {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
