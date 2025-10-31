import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-bulgaria',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagBulgaria"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagBulgaria__a)">
            <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#00966E" />
            <path d="M1.5 5H22.5V9.66656H1.5V5Z" fill="white" />
            <path d="M1.5 14.3335H22.5V19.0001H1.5V14.3335Z" fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagBulgaria__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-bulgaria { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagBulgaria {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
