import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-cambodia',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagCambodia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagCambodia__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#D80027" />
            <path d="M1.5 5H22.5V9.66656H1.5V5ZM1.5 14.3332H22.5V18.9997H1.5V14.3332Z" fill="#0052B4" />
            <path
                d="M13.9479 13.0651V12.3347H13.4609V11.3608L12.9739 10.8738L12.487 11.3608V10.3869L12 9.8999L11.513 10.3869V11.3608L11.0261 10.8738L10.5392 11.3608V12.3347H10.0522V13.0651H9.56525V13.7955H14.4348V13.0651H13.9479Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagCambodia__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagCambodia {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
