import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-costa-rica',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagCostaRica"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagCostaRica__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="white" />
            <path d="M1.5 10.1738H22.5V13.826H1.5V10.1738Z" fill="#D80027" />
            <path d="M1.5 15.9566H22.5V19.0002H1.5V15.9566ZM1.5 5H22.5V8.04365H1.5V5Z" fill="#0052B4" />
        </g>
        <defs>
            <clipPath id="SvgFlagCostaRica__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-costa-rica { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagCostaRica {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
