import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-vietnam',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolVietnam"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolVietnam__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#D80027"
            />
            <path
                d="M12.0001 7.21777L13.0793 10.5392H16.5717L13.7463 12.592L14.8255 15.9134L12.0001 13.8607L9.1747 15.9134L10.2539 12.592L7.42853 10.5392H10.9209L12.0001 7.21777Z"
                fill="#FFDA44"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolVietnam__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-vietnam { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolVietnam {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
