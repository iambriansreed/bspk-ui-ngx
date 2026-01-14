import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-peru',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolPeru"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolPeru__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white" />
            <path
                d="M22 12.0013C22 7.70165 19.2863 4.03618 15.4783 2.62329V21.3793C19.2863 19.9663 22 16.3009 22 12.0013Z"
                fill="#D80027" />
            <path
                d="M2.00018 12.0005C2.00018 16.3002 4.71393 19.9656 8.52194 21.3786V2.62256C4.71393 4.03545 2.00018 7.70092 2.00018 12.0005Z"
                fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgSymbolPeru__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-peru { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolPeru {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
