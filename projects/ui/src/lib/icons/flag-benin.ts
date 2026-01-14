import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-benin',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagBenin"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagBenin__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#008751" />
            <path d="M9.55066 5H22.5V12H9.55066V5Z" fill="#FCD116" />
            <path d="M9.55066 11.9863H22.5V18.9863H9.55066V11.9863Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagBenin__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-benin { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBenin {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
