import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-somalia',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolSomalia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolSomalia__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#338AF3" />
            <path
                d="M12.0001 7.21729L13.0793 10.5387H16.5716L13.7462 12.5915L14.8255 15.9129L12.0001 13.8602L9.17468 15.9129L10.2539 12.5915L7.42847 10.5387H10.9208L12.0001 7.21729Z"
                fill="white" />
        </g>
        <defs>
            <clipPath id="SvgSymbolSomalia__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-somalia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolSomalia {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
