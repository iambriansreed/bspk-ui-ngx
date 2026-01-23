import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-austria',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagAustria"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagAustria__a)">
            <path d="M1.5 9.6665H22.5V14.3332H1.5V9.6665Z" fill="white" />
            <path d="M1.5 5H22.5V9.66667H1.5V5ZM1.5 14.3333H22.5V19H1.5V14.3333Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagAustria__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-austria { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagAustria {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
