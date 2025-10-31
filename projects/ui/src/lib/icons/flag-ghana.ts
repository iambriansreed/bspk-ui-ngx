import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-ghana',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagGhana"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagGhana__a)">
            <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#FFDA44" />
            <path d="M1.5 5.00024H22.5V9.6668H1.5V5.00024Z" fill="#D80027" />
            <path d="M1.5 14.3333H22.5V18.9998H1.5V14.3333Z" fill="#496E2D" />
            <path
                d="M11.9952 9.66675L12.5743 11.4492L14.2299 11.5805L12.7136 12.6822L13.5115 14.3334L11.9952 13.2318L10.4789 14.3334L11.0581 12.5509L9.54181 11.4492H11.4161L11.9952 9.66675Z"
                fill="black"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagGhana__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-ghana { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagGhana {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
