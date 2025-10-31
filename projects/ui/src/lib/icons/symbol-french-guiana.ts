import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-french-guiana',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolFrenchGuiana"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolFrenchGuiana__a)">
            <g clip-path="url(#SvgSymbolFrenchGuiana__b)">
                <path d="M-3 2L27 22H-3V2Z" fill="#FDEB01" />
                <path d="M27 2V22L-3 2H27Z" fill="#58A846" />
                <path
                    d="M13.9 13.1001L17 10.8667H13.1667L12 7.2334L10.8333 10.8667H7L10.1 13.1001L8.9 16.7667L12 14.5334L15.1 16.7667L13.9 13.1001Z"
                    fill="#ED3D24"
                />
            </g>
        </g>
        <defs>
            <clipPath id="SvgSymbolFrenchGuiana__a">
                <rect x="2" y="2" width="20" height="20" rx="10" fill="white" />
            </clipPath>
            <clipPath id="SvgSymbolFrenchGuiana__b">
                <rect width="30" height="20" fill="white" transform="translate(-3 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-french-guiana { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolFrenchGuiana {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
