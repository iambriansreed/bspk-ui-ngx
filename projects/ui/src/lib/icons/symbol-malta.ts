import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-malta',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolMalta"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolMalta__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white" />
            <path
                d="M11.9998 1.99951C17.5226 1.99951 21.9998 6.4767 21.9998 11.9995C21.9998 17.5223 17.5226 21.9995 11.9998 21.9995"
                fill="#C31B28" />
            <path
                d="M8.95631 5.91347V4.60913H7.65197V5.91347H6.3476V7.2178H7.65197V8.52217H8.95631V7.2178H10.2606V5.91347H8.95631Z"
                fill="#ACABB1" />
        </g>
        <defs>
            <clipPath id="SvgSymbolMalta__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-malta { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolMalta {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
