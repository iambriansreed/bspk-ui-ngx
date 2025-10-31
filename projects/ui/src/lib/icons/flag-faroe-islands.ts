import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-faroe-islands',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagFaroeIslands"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagFaroeIslands__a)">
            <path d="M1.49896 5H22.501V19H1.49896V5Z" fill="white" />
            <path
                d="M22.501 13.7987H9.95721V19H6.35569V13.7987H1.49896V10.2013H6.35569V5H9.95721V10.2013H22.501V12.8758V13.7987Z"
                fill="#0052B4"
            />
            <path
                d="M22.501 11.1242V12.8758H9.03427V19H7.28273V12.8758H1.49896V11.1242H7.28273V5H9.03427V11.1242H22.501Z"
                fill="#D80027"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagFaroeIslands__a">
                <rect width="21.0021" height="14" fill="white" transform="translate(1.49896 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagFaroeIslands {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
