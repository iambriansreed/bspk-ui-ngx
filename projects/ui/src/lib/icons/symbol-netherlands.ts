import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-netherlands',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolNetherlands"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgSymbolNetherlands__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white" />
            <path
                d="M12.0001 1.99951C7.70049 1.99951 4.03506 4.71326 2.62213 8.52127H21.3782C19.9652 4.71326 16.2998 1.99951 12.0001 1.99951Z"
                fill="#CD1F2A" />
            <path
                d="M12.0001 22.0003C16.2998 22.0003 19.9652 19.2865 21.3781 15.4785H2.62213C4.03506 19.2865 7.70049 22.0003 12.0001 22.0003Z"
                fill="#1D4185" />
        </g>
        <defs>
            <clipPath id="SvgSymbolNetherlands__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-netherlands { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolNetherlands {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
