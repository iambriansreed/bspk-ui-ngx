import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-qatar',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagQatar"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagQatar__a)">
            <path d="M1.5 5H22.4591V19H1.5V5Z" fill="#751A46" />
            <path
                d="M1.5 5V19H7.65263L9.19591 18.1977L7.65263 17.424L9.19591 16.6462L7.65263 15.8725L9.19591 15.0947L7.65263 14.317L9.19591 13.5433L7.65263 12.7655L9.19591 11.9877L7.65263 11.214L9.19591 10.4363L7.65263 9.66257L9.19591 8.8848L7.65263 8.10702L9.19591 7.33333L7.65263 6.55556L9.19591 5.78187L7.65263 5H1.5Z"
                fill="white" />
        </g>
        <defs>
            <clipPath id="SvgFlagQatar__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-qatar { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagQatar {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
