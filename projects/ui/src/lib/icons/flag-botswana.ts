import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-botswana',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagBotswana"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagBotswana__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path d="M1.5 14.7427H22.5V19H1.5V14.7427ZM1.5 5H22.5V9.25731H1.5V5Z" fill="#6DA9D2" />
            <path d="M1.5 10.1372H22.5V13.8073H1.5V10.1372Z" fill="black" />
        </g>
        <defs>
            <clipPath id="SvgFlagBotswana__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-botswana { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBotswana {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
