import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-syria',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagSyria"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagSyria__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="white" />
            <path d="M1.5 5H22.5V9.66656H1.5V5Z" fill="#D80027" />
            <path d="M1.5 14.333H22.5V18.9996H1.5V14.333Z" fill="black" />
            <path
                d="M9.18266 10.3259L9.56033 11.4884H10.7827L9.7938 12.2069L10.1715 13.3693L9.18266 12.6509L8.19377 13.3693L8.57149 12.2069L7.58264 11.4884H8.80495L9.18266 10.3259ZM14.8174 10.3259L15.1951 11.4884H16.4174L15.4286 12.2069L15.8063 13.3693L14.8174 12.6509L13.8285 13.3693L14.2063 12.2069L13.2174 11.4884H14.4397L14.8174 10.3259Z"
                fill="#6DA544"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagSyria__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagSyria {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
