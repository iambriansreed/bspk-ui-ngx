import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-chile',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagChile"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagChile__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#D80027" />
            <path d="M9.52338 5H22.5V12H9.52338V5Z" fill="white" />
            <path d="M1.5 5H9.52339V12H1.5V5Z" fill="#0037A1" />
            <path
                d="M5.51167 6.00293L6.1298 7.90644H8.13155L6.5105 9.08129L7.13272 10.9848L5.51167 9.80995L3.89062 10.9848L4.51284 9.08129L2.89178 7.90644H4.89354L5.51167 6.00293Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagChile__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagChile {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
