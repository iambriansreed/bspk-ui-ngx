import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-senegal',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagSenegal"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagSenegal__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#FFDA44" />
            <path d="M15.0436 5H22.5V19.0002H15.0436V5Z" fill="#D80027" />
            <path
                d="M1.5 5H8.95636V19.0002H1.5V5ZM12 9.56508L12.6043 11.425H14.5601L12.9779 12.5747L13.5822 14.4346L12 13.2851L10.4177 14.4346L11.0222 12.5747L9.43994 11.425H11.3956L12 9.56508Z"
                fill="#496E2D"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagSenegal__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-senegal { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagSenegal {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
