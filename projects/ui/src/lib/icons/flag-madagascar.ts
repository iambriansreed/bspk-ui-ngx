import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-madagascar',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagMadagascar"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagMadagascar__a)">
            <path d="M22.5 18.9999V4.99976H1.5V18.9999H22.5Z" fill="#6DA544" />
            <path d="M22.5 5H1.5V12H22.5V5Z" fill="#D80027" />
            <path d="M1.5 5H8.95636V19.0002H1.5V5Z" fill="white" />
        </g>
        <defs>
            <clipPath id="SvgFlagMadagascar__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-madagascar { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagMadagascar {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
