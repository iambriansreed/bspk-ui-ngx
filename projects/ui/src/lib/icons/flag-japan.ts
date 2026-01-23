import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-japan',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagJapan"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagJapan__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="white" />
            <path
                d="M12 15.9373C14.1746 15.9373 15.9375 14.1744 15.9375 11.9998C15.9375 9.82514 14.1746 8.06226 12 8.06226C9.82538 8.06226 8.0625 9.82514 8.0625 11.9998C8.0625 14.1744 9.82538 15.9373 12 15.9373Z"
                fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagJapan__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-japan { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagJapan {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
