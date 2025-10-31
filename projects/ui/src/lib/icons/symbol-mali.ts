import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-mali',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolMali"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolMali__a)">
            <path
                d="M15.4785 2.6215C14.3952 2.21955 13.2235 1.99951 12.0003 1.99951C10.7771 1.99951 9.60536 2.21955 8.52204 2.6215L7.65247 11.9995L8.52204 21.3775C9.60536 21.7795 10.7771 21.9995 12.0003 21.9995C13.2235 21.9995 14.3952 21.7795 15.4785 21.3775L16.3481 11.9995L15.4785 2.6215Z"
                fill="#FFDA44"
            />
            <path
                d="M21.9997 12.0003C21.9997 7.70067 19.2859 4.03521 15.4779 2.62231V21.3784C19.2859 19.9654 21.9997 16.3 21.9997 12.0003Z"
                fill="#D80027"
            />
            <path
                d="M2.00012 11.9995C2.00012 16.2992 4.71387 19.9646 8.52188 21.3776V2.62158C4.71387 4.03447 2.00012 7.69994 2.00012 11.9995Z"
                fill="#6DA544"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolMali__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-mali { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolMali {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
