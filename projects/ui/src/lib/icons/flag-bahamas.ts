import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-bahamas',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagBahamas"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagBahamas__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#FFC72C" />
            <path d="M1.5 5H22.5V9.66656H1.5V5ZM1.5 14.3332H22.5V18.9997H1.5V14.3332Z" fill="#00778B" />
            <path d="M12 12.0003L1.5 19.0002V5L12 12.0003Z" fill="black" />
        </g>
        <defs>
            <clipPath id="SvgFlagBahamas__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-bahamas { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBahamas {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
