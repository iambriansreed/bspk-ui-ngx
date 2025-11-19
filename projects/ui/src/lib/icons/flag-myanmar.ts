import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-myanmar',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagMyanmar"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagMyanmar__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#6DA544" />
            <path d="M1.5 5.00024H22.5V9.6668H1.5V5.00024Z" fill="#FFDA44" />
            <path d="M1.5 14.3333H22.5V18.9998H1.5V14.3333Z" fill="#D80027" />
            <path
                d="M17.25 10.8214H13.2394L12 7.00708L10.7606 10.8214H6.75L9.99467 13.1788L8.7553 16.9932L12 14.6631L15.2447 16.9932L14.0053 13.1788L17.25 10.8214Z"
                fill="white" />
        </g>
        <defs>
            <clipPath id="SvgFlagMyanmar__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-myanmar { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagMyanmar {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
