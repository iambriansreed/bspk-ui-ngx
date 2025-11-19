import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-republic-of-the-congo',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolRepublicOfTheCongo"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolRepublicOfTheCongo__a)">
            <path
                d="M7.42093 20.8915L14.7672 14.7662L20.8925 7.41993C19.9402 5.57431 18.4301 4.06342 16.5852 3.10986L9.23312 9.23216L3.1109 16.5842C4.06438 18.4291 5.57527 19.9392 7.42093 20.8915Z"
                fill="#FFDA44" />
            <path
                d="M19.071 19.0709C22.226 15.916 22.8316 11.1778 20.8892 7.41431L7.41443 20.8891C11.1779 22.8315 15.9161 22.2258 19.071 19.0709Z"
                fill="#D80027" />
            <path
                d="M4.92857 4.9279C1.77366 8.08282 1.16803 12.821 3.11034 16.5845L16.5852 3.1097C12.8217 1.16732 8.08349 1.77302 4.92857 4.9279Z"
                fill="#009543" />
        </g>
        <defs>
            <clipPath id="SvgSymbolRepublicOfTheCongo__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-republic-of-the-congo { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolRepublicOfTheCongo {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
