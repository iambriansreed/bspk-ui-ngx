import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-mauritius',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolMauritius"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolMauritius__a)">
            <path
                d="M3.21558 7.2169L11.9997 8.08647L20.7838 7.2169C19.0877 4.10846 15.7901 1.99951 11.9997 1.99951C8.20925 1.99951 4.91163 4.10846 3.21558 7.2169Z"
                fill="#D80027"
            />
            <path
                d="M3.21565 16.7821L11.9998 17.6516L20.7839 16.7821C21.559 15.3613 21.9998 13.7319 21.9998 11.9995L11.9998 11.1299L1.99976 11.9995C1.99976 13.7319 2.4405 15.3613 3.21565 16.7821Z"
                fill="#F7CE00"
            />
            <path
                d="M3.21565 7.21753C2.4405 8.63827 1.99976 10.2677 1.99976 12.0001H21.9998C21.9998 10.2677 21.559 8.63827 20.7839 7.21753H11.9998H3.21565Z"
                fill="#191F6A"
            />
            <path
                d="M11.9997 21.9996C15.7901 21.9996 19.0877 19.8907 20.7838 16.7822H3.21558C4.91163 19.8907 8.20925 21.9996 11.9997 21.9996Z"
                fill="#00A04E"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolMauritius__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolMauritius {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
