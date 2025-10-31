import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-grenadines',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagGrenadines"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagGrenadines__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#FFDA44" />
            <path d="M1.5 5H8.49986V19.0002H1.5V5Z" fill="#338AF3" />
            <path
                d="M15.5001 5H22.5V19.0002H15.5001V5ZM10.288 13.1412L8.9184 11.0868L10.288 9.0325L11.6576 11.0868L10.288 13.1412ZM13.7119 13.1412L12.3424 11.0868L13.7119 9.0325L15.0816 11.0868L13.7119 13.1412ZM12 15.8803L10.6304 13.826L12 11.7716L13.3695 13.826L12 15.8803Z"
                fill="#6DA544"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagGrenadines__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-grenadines { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagGrenadines {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
