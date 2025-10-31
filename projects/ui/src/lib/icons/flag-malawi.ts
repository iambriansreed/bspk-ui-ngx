import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-malawi',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagMalawi"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagMalawi__a)">
            <path d="M1.5 5H22.5V9.66667H1.5V5Z" fill="#272727" />
            <path d="M1.5 9.66675H22.5V14.3334H1.5V9.66675Z" fill="#E40112" />
            <path d="M1.5 14.3333H22.5V18.9999H1.5V14.3333Z" fill="#07893F" />
            <path
                d="M12 14.0058C14.152 14.0058 15.8965 12.2647 15.8965 10.1169C15.8965 7.96914 14.152 6.22803 12 6.22803C9.84803 6.22803 8.10352 7.96914 8.10352 10.1169C8.10352 12.2647 9.84803 14.0058 12 14.0058Z"
                fill="#E40112"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagMalawi__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-malawi { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagMalawi {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
