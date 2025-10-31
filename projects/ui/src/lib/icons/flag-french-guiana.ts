import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-french-guiana',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagFrenchGuiana"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagFrenchGuiana__a)">
            <path d="M1.5 5L22.5 19H1.5V5Z" fill="#FDEB01" />
            <path d="M22.5 5V19L1.5 5H22.5Z" fill="#58A846" />
            <path
                d="M13.33 12.77L15.5 11.2067H12.8167L12 8.66333L11.1833 11.2067H8.5L10.67 12.77L9.83 15.3367L12 13.7733L14.17 15.3367L13.33 12.77Z"
                fill="#ED3D24"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagFrenchGuiana__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-french-guiana { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagFrenchGuiana {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
