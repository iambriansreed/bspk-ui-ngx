import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-aland-island',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagAlandIsland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagAlandIsland__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#0052B4" />
            <path
                d="M22.5 13.6333H9.77719V19H6.51053V13.6333H1.5V10.3667H6.51053V5H9.77719V10.3667H22.5V12.8719V13.6333Z"
                fill="#FFDA44" />
            <path
                d="M22.5 11.1281V12.8719H9.01988V19H7.27193V12.8719H1.5V11.1281H7.27193V5H9.01988V11.1281H22.5Z"
                fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagAlandIsland__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-aland-island { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagAlandIsland {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
