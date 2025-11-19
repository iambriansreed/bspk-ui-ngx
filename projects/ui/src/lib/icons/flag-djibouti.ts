import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-djibouti',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagDjibouti"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagDjibouti__a)">
            <path d="M1.49896 5H22.501V19H1.49896V5Z" fill="#12AD2B" />
            <path d="M22.501 5V11.838L1.49896 12.0062V5H22.501Z" fill="#6AB2E7" />
            <path d="M12 12.0021L1.49896 19V5L12 12.0021Z" fill="white" />
            <path
                d="M5.1825 8.79443L5.87984 10.9439H8.14412L6.31465 12.277L7.01198 14.4264L5.1825 13.0974L3.35303 14.4264L4.05036 12.277L2.22089 10.9439H4.48517L5.1825 8.79443Z"
                fill="#D7141A" />
        </g>
        <defs>
            <clipPath id="SvgFlagDjibouti__a">
                <rect width="21.0021" height="14" fill="white" transform="translate(1.49896 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-djibouti { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagDjibouti {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
