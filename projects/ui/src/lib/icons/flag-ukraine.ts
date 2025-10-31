import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-ukraine',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagUkraine"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagUkraine__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#FFDA44" />
            <path d="M1.5 5.00024H22.5V12.0001H1.5V5.00024Z" fill="#338AF3" />
        </g>
        <defs>
            <clipPath id="SvgFlagUkraine__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-ukraine { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagUkraine {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
