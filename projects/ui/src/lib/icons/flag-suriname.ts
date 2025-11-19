import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-suriname',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagSuriname"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagSuriname__a)">
            <path d="M1.5 5H22.5V19.0002H1.5V5Z" fill="white" />
            <path d="M1.5 9.56519H22.5V14.4349H1.5V9.56519Z" fill="#A2001D" />
            <path d="M1.5 15.9566H22.5V19.0002H1.5V15.9566ZM1.5 5H22.5V8.04365H1.5V5Z" fill="#6DA544" />
            <path
                d="M12.0305 10.4417L12.4172 11.632H13.669L12.6563 12.3677L13.0431 13.5581L12.0305 12.8224L11.0178 13.5581L11.4046 12.3677L10.392 11.632H11.6437L12.0305 10.4417Z"
                fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgFlagSuriname__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-suriname { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagSuriname {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
