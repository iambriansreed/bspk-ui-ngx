import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-bangladesh',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolBangladesh"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolBangladesh__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#2D6E41" />
            <path
                d="M9.82608 16.348C12.2273 16.348 14.1739 14.4014 14.1739 12.0002C14.1739 9.59893 12.2273 7.65234 9.82608 7.65234C7.42485 7.65234 5.47827 9.59893 5.47827 12.0002C5.47827 14.4014 7.42485 16.348 9.82608 16.348Z"
                fill="#F40B32" />
        </g>
        <defs>
            <clipPath id="SvgSymbolBangladesh__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-bangladesh { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolBangladesh {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
