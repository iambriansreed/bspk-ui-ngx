import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-liechtenstein',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagLiechtenstein"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagLiechtenstein__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#D80027" />
            <path d="M1.5 5H22.5V12H1.5V5Z" fill="#0052B4" />
            <path
                d="M7.61168 9.01579C7.61168 8.44269 7.14911 7.98012 6.57601 7.98012C6.30993 7.98012 6.06841 8.07836 5.8842 8.24211V7.63626H6.22806V6.94445H5.8842V6.60059H5.19648V6.94445H4.85262V7.63626H5.19648V8.2462C5.01227 8.08246 4.77075 7.98421 4.50467 7.98421C3.93157 7.98421 3.46899 8.44678 3.46899 9.01988C3.46899 9.3269 3.60408 9.60117 3.81285 9.78947V10.3994H7.26373V9.78947C7.48069 9.59708 7.61168 9.31871 7.61168 9.01579Z"
                fill="#FFDA44"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagLiechtenstein__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-liechtenstein { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagLiechtenstein {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
