import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-italy',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagItaly"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagItaly__a)">
            <path d="M15.5 4.99976H1.5V18.9997H22.5V4.99976H15.5Z" fill="white" />
            <path d="M1.5 5H8.49986V19.0002H1.5V5Z" fill="#6DA544" />
            <path d="M15.5002 5H22.5V19.0002H15.5002V5Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagItaly__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-italy { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagItaly {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
