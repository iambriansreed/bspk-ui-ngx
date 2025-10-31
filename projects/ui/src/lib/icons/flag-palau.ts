import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-palau',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagPalau"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagPalau__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="#338AF3" />
            <path
                d="M10.4784 15.0434C12.1594 15.0434 13.5221 13.6807 13.5221 11.9997C13.5221 10.3187 12.1594 8.95605 10.4784 8.95605C8.79744 8.95605 7.43475 10.3187 7.43475 11.9997C7.43475 13.6807 8.79744 15.0434 10.4784 15.0434Z"
                fill="#FFDA44"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagPalau__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-palau { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagPalau {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
