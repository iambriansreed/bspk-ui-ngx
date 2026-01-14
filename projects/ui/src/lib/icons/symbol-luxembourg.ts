import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-luxembourg',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolLuxembourg"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolLuxembourg__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white" />
            <path
                d="M12.0001 1.99976C7.70049 1.99976 4.03506 4.71351 2.62213 8.52151H21.3782C19.9652 4.71351 16.2998 1.99976 12.0001 1.99976Z"
                fill="#D80027" />
            <path
                d="M12.0002 22.0008C16.2998 22.0008 19.9653 19.287 21.3782 15.479H2.62219C4.03512 19.287 7.70055 22.0008 12.0002 22.0008Z"
                fill="#338AF3" />
        </g>
        <defs>
            <clipPath id="SvgSymbolLuxembourg__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-luxembourg { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolLuxembourg {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
