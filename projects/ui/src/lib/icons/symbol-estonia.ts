import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-estonia',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolEstonia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolEstonia__a)">
            <path
                d="M1.99976 11.9995C1.99976 13.2227 2.21979 14.3944 2.62175 15.4777L11.9998 15.9125L21.3778 15.4777C21.7798 14.3944 21.9998 13.2227 21.9998 11.9995C21.9998 10.7763 21.7798 9.60455 21.3778 8.52123L11.9998 8.08643L2.62175 8.52119C2.21979 9.60455 1.99976 10.7763 1.99976 11.9995Z"
                fill="#111111"
            />
            <path
                d="M11.9997 1.99951C7.70006 1.99951 4.03463 4.71326 2.6217 8.52127H21.3778C19.9648 4.71326 16.2994 1.99951 11.9997 1.99951Z"
                fill="#368FD8"
            />
            <path
                d="M21.3777 15.4785H2.6217C4.03463 19.2865 7.70006 22.0003 11.9997 22.0003C16.2994 22.0003 19.9648 19.2865 21.3777 15.4785Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolEstonia__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolEstonia {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
