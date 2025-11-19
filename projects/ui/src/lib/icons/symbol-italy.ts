import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-italy',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolItaly"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolItaly__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white" />
            <path
                d="M21.9999 11.9993C21.9999 7.6997 19.2862 4.03427 15.4781 2.62134V21.3774C19.2862 19.9644 21.9999 16.299 21.9999 11.9993Z"
                fill="#D80027" />
            <path
                d="M1.99988 11.9998C1.99988 16.2995 4.71363 19.9649 8.52164 21.3778V2.62183C4.71363 4.03476 1.99988 7.70019 1.99988 11.9998Z"
                fill="#6DA544" />
        </g>
        <defs>
            <clipPath id="SvgSymbolItaly__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-italy { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolItaly {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
