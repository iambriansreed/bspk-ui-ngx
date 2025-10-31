import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-united-arab-emirates',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagUnitedArabEmirates"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagUnitedArabEmirates__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path d="M1.5 5H22.5V9.66667H1.5V5Z" fill="#009E49" />
            <path d="M1.5 14.3333H22.5V18.9999H1.5V14.3333Z" fill="black" />
            <path d="M1.5 5H8.5V19H1.5V5Z" fill="#CE1126" />
        </g>
        <defs>
            <clipPath id="SvgFlagUnitedArabEmirates__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-united-arab-emirates { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagUnitedArabEmirates {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
