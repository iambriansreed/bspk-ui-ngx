import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-colombia',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolColombia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolColombia__a)">
            <path d="M2 12C2 6.47719 6.47719 2 12 2C17.5228 2 22 6.47719 22 12L12 12.8696L2 12Z" fill="#FFDA44" />
            <path
                d="M3.3382 17.0003C5.0673 19.9892 8.2987 22.0003 12.0001 22.0003C15.7014 22.0003 18.9328 19.9892 20.6619 17.0003L12.0001 16.3481L3.3382 17.0003Z"
                fill="#D80027"
            />
            <path
                d="M20.6615 17C21.5124 15.5291 21.9996 13.8215 21.9996 12H1.99963C1.99963 13.8215 2.4869 15.5291 3.33776 17H20.6615Z"
                fill="#0052B4"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolColombia__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-colombia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolColombia {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
