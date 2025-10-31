import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-switzerland',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagSwitzerland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagSwitzerland__a)">
            <path d="M1.5 5.00024H22.5V19.0002H1.5V5.00024Z" fill="#FF0000" />
            <path
                d="M16.0802 10.6195H13.3464V7.88574H10.6127V10.6195H7.87885V13.3533H10.6127V16.0871H13.3464V13.3533H16.0802V10.6195Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagSwitzerland__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-switzerland { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagSwitzerland {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
