import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-czech-republic',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagCzechRepublic"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagCzechRepublic__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#11457E" />
            <path d="M22.5 12V18.9999H1.5L10.326 12H22.5Z" fill="#D7141A" />
            <path d="M22.5 5V11.9999H10.326L1.5 5H22.5Z" fill="white" />
        </g>
        <defs>
            <clipPath id="SvgFlagCzechRepublic__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagCzechRepublic {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
