import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-st-lucia',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolStLucia"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolStLucia__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#55B2FF"
            />
            <path d="M8.30438 15.4783H15.6957L12.0001 6.78271L8.30438 15.4783Z" fill="#F3F3F3" />
            <path d="M9.58881 14.6085L12.0001 9.12378L14.4114 14.6085H9.58881Z" fill="#333333" />
            <path d="M8.30438 15.4787H15.6957L12.0001 12.0005L8.30438 15.4787Z" fill="#FFDA44" />
        </g>
        <defs>
            <clipPath id="SvgSymbolStLucia__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-st-lucia { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolStLucia {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
