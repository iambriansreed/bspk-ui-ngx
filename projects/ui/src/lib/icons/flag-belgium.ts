import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-belgium',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagBelgium"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagBelgium__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#FDDA25" />
            <path d="M1.5 5H8.5V19H1.5V5Z" fill="black" />
            <path d="M15.5 5H22.5V19H15.5V5Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagBelgium__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBelgium {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
