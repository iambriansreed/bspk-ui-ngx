import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-japan',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolJapan"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolJapan__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white"
            />
            <path
                d="M12 16.3482C14.4012 16.3482 16.3478 14.4016 16.3478 12.0004C16.3478 9.59917 14.4012 7.65259 12 7.65259C9.59874 7.65259 7.65216 9.59917 7.65216 12.0004C7.65216 14.4016 9.59874 16.3482 12 16.3482Z"
                fill="#D80027"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolJapan__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolJapan {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
