import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-benin',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolBenin"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolBenin__a)">
            <path
                d="M8.52185 11.1309L9.39142 21.6559C10.2232 21.8801 11.0975 22.0004 12.0001 22.0004C17.5229 22.0004 22.0001 17.5232 22.0001 12.0004L8.52185 11.1309Z"
                fill="#D80027" />
            <path
                d="M8.52185 12L9.39138 2.34449C10.2232 2.12031 11.0975 2 12.0001 2C17.5229 2 22.0001 6.47719 22.0001 12H8.52185Z"
                fill="#FCD116" />
            <path
                d="M1.99963 11.9997C1.99963 16.62 5.13327 20.5078 9.39092 21.6553V2.34424C5.13327 3.49174 1.99963 7.37947 1.99963 11.9997Z"
                fill="#008751" />
        </g>
        <defs>
            <clipPath id="SvgSymbolBenin__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-benin { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolBenin {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
