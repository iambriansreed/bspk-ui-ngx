import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-vietnam',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagVietnam"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagVietnam__a)">
            <path d="M9.56536 5.00024H1.5V19H22.5V5.00024H9.56536Z" fill="#D80027" />
            <path
                d="M12 7.95093L12.9295 10.8116H15.9375L13.504 12.5797L14.4335 15.4405L12 13.6724L9.56646 15.4405L10.496 12.5797L8.0625 10.8116H11.0705L12 7.95093Z"
                fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgFlagVietnam__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-vietnam { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagVietnam {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
