import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-poland',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolPoland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolPoland__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white"
            />
            <path
                d="M22 11.9998C22 17.5226 17.5228 21.9998 12 21.9998C6.47719 21.9998 2 17.5226 2 11.9998"
                fill="#D80027"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolPoland__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-poland { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolPoland {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
