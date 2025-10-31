import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-greece',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagGreece"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagGreece__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path
                d="M1.5 5H22.5V6.55556H1.5V5ZM1.5 8.11111H22.5V9.66667H1.5V8.11111ZM1.5 11.2222H22.5V12.7778H1.5V11.2222ZM1.5 14.3333H22.5V15.8889H1.5V14.3333ZM1.5 17.4444H22.5V19H1.5V17.4444Z"
                fill="#0D5EAF"
            />
            <path d="M1.5 5H9.27778V12.7778H1.5V5Z" fill="#0D5EAF" />
            <path d="M1.5 8.11108H9.27778V9.66664H1.5V8.11108Z" fill="white" />
            <path d="M4.61108 5H6.16664V12.7778H4.61108V5Z" fill="white" />
        </g>
        <defs>
            <clipPath id="SvgFlagGreece__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-greece { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagGreece {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
