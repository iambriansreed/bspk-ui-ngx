import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-namibia',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagNamibia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagNamibia__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#496E2D" />
            <path d="M1.5 19V5.00024H22.5" fill="#0052B4" />
            <path d="M22.5 7.74358V5.00024H18.3849L1.5 16.2566V19H5.6151L22.5 7.74358Z" fill="white" />
            <path d="M22.5 5.00024V6.646L3.96885 19H1.5V17.3542L20.0311 5.00024H22.5Z" fill="#A2001D" />
            <path
                d="M9.20015 9.26077L8.26742 9.69947L8.76411 10.6028L7.75132 10.409L7.62298 11.4322L6.91755 10.6797L6.21208 11.4322L6.08374 10.409L5.07095 10.6028L5.5676 9.69947L4.63495 9.26077L5.56764 8.82202L5.07095 7.91877L6.08374 8.11245L6.21212 7.08936L6.91755 7.84187L7.62302 7.08936L7.75132 8.11245L8.76411 7.91877L8.2675 8.8221L9.20015 9.26077Z"
                fill="#FFDA44"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagNamibia__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-namibia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagNamibia {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
