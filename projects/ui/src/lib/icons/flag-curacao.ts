import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-curacao',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagCuracao"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagCuracao__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#002B7F" />
            <path d="M1.5 14.5586H22.5V16.6463H1.5V14.5586Z" fill="#F9E814" />
            <path
                d="M8.40583 8.54109L8.9339 10.1703H10.645L9.26139 11.1733L9.78946 12.7984L8.40583 11.7955L7.0222 12.7984L7.55027 11.1733L6.16665 10.1703H7.87776L8.40583 8.54109ZM4.99589 6.33057L5.31519 7.30893H6.33858L5.50758 7.91068L5.82688 8.88495L4.99589 8.2832L4.16489 8.88495L4.48419 7.91068L3.6532 7.30893H4.68068L4.99589 6.33057Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagCuracao__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagCuracao {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
