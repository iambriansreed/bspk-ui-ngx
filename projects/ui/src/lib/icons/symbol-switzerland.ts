import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-switzerland',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolSwitzerland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolSwitzerland__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#FF0000" />
            <path
                d="M17.217 10.261H13.7387V6.78271H10.2605V10.261H6.78223V13.7392H10.2605V17.2175H13.7387V13.7392H17.217V10.261Z"
                fill="white" />
        </g>
        <defs>
            <clipPath id="SvgSymbolSwitzerland__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-switzerland { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolSwitzerland {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
