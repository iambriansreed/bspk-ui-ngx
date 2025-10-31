import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-republic-of-the-congo',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagRepublicOfTheCongo"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagRepublicOfTheCongo__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#D80027" />
            <path d="M19.6642 5L5.69181 18.9724H1.5V5H19.6642Z" fill="#009543" />
            <path d="M21.9729 5L8.0005 18.9724H1.98615L15.9586 5H21.9729Z" fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgFlagRepublicOfTheCongo__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-republic-of-the-congo { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagRepublicOfTheCongo {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
