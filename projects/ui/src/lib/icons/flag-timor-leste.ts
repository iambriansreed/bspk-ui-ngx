import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-timor-leste',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagTimorLeste"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagTimorLeste__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#D80027" />
            <path d="M12 12L1.5 5.21973V7.03434L7.89131 12L1.5 16.9656V18.7802L12 12Z" fill="#FFDA44" />
            <path d="M1.5 5.21973V18.7802L9.26086 12L1.5 5.21973Z" fill="black" />
            <path
                d="M3.31222 10.2512L4.334 11.2182L5.56943 10.5452L4.96556 11.8158L5.9873 12.7828L4.59228 12.6011L3.9884 13.8717L3.73017 12.4888L2.33514 12.3071L3.57049 11.6341L3.31222 10.2512Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagTimorLeste__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-timor-leste { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagTimorLeste {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
