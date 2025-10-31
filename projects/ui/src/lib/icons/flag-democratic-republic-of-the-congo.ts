import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-democratic-republic-of-the-congo',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagDemocraticRepublicOfTheCongo"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagDemocraticRepublicOfTheCongo__a)">
            <path d="M1.49896 5H22.501V19H1.49896V5Z" fill="#338AF3" />
            <path d="M22.501 7.74421V5H18.3867L1.49896 16.2558V19H5.61323L22.501 7.74421Z" fill="#FFDA44" />
            <path d="M22.501 5V6.64489L3.96834 19H1.49896V17.3551L20.0316 5H22.501Z" fill="#D80027" />
            <path
                d="M5.33841 6.27979L6.00703 8.34717H8.18518L6.42543 9.62699L7.09816 11.6985L5.33841 10.4187L3.57457 11.6985L4.24729 9.62699L2.48755 8.34717H4.66569L5.33841 6.27979Z"
                fill="#FFDA44"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagDemocraticRepublicOfTheCongo__a">
                <rect width="21.0021" height="14" fill="white" transform="translate(1.49896 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-democratic-republic-of-the-congo { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagDemocraticRepublicOfTheCongo {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
