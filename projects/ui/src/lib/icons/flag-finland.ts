import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-finland',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagFinland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagFinland__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path
                d="M22.5 10.3038V13.6962H9.85488V19H6.46289V13.6962H1.5V10.3038H6.46289V5H9.85488V10.3038H22.5Z"
                fill="#0052B4"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagFinland__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagFinland {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
