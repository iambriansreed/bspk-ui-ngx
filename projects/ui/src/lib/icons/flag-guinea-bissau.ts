import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-guinea-bissau',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagGuineaBissau"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagGuineaBissau__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#6DA544" />
            <path d="M1.5 5H22.5V11.9999H1.5V5Z" fill="#FFDA44" />
            <path d="M1.5 5H8.95636V19.0002H1.5V5Z" fill="#D80027" />
            <path
                d="M5.53268 9.50317L6.1523 11.4103H8.15772L6.53535 12.5891L7.15501 14.4962L5.53268 13.3175L3.91026 14.4962L4.53005 12.5891L2.90771 11.4103H4.91301L5.53268 9.50317Z"
                fill="black" />
        </g>
        <defs>
            <clipPath id="SvgFlagGuineaBissau__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-guinea-bissau { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagGuineaBissau {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
