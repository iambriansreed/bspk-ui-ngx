import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-niger',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagNiger"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagNiger__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="white" />
            <path d="M1.5 5.00024H22.5V9.6668H1.5V5.00024Z" fill="#E05206" />
            <path d="M1.5 14.3333H22.5V18.9998H1.5V14.3333Z" fill="#0DB02B" />
            <path
                d="M12 13.3125C12.7249 13.3125 13.3125 12.7249 13.3125 12C13.3125 11.2751 12.7249 10.6875 12 10.6875C11.2751 10.6875 10.6875 11.2751 10.6875 12C10.6875 12.7249 11.2751 13.3125 12 13.3125Z"
                fill="#E05206" />
        </g>
        <defs>
            <clipPath id="SvgFlagNiger__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-niger { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagNiger {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
