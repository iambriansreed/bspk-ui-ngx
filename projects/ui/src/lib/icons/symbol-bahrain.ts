import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-bahrain',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolBahrain"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolBahrain__a)">
            <path
                d="M10 22C15.5228 22 20 17.5228 20 12C20 6.47715 15.5228 2 10 2C4.47715 2 0 6.47715 0 12C0 17.5228 4.47715 22 10 22Z"
                fill="white"
            />
            <path
                d="M10.0001 1.99902C7.99323 1.99902 6.12479 2.59063 4.55869 3.60832L7.13053 5.33211L3.91315 6.99875L7.13053 8.66539L3.91315 10.332L7.13053 11.9985L3.91315 13.6651L7.13053 15.3317L3.91315 16.9985L7.13053 18.6651L4.55838 20.3895C6.12455 21.4073 7.99311 21.999 10.0001 21.999C15.5229 21.999 20.0001 17.5218 20.0001 11.999C20.0001 6.47621 15.5229 1.99902 10.0001 1.99902Z"
                fill="#D80027"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolBahrain__a">
                <rect width="20" height="20" fill="white" transform="translate(0 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolBahrain {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
