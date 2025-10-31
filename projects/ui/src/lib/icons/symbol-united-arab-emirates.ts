import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-united-arab-emirates',
    template: `<svg
        [style.width]="width"
        data-bspk-name="SymbolUnitedArabEmirates"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolUnitedArabEmirates__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="white"
            />
            <path
                d="M7.65216 15.4773L8.52173 21.3771C9.60501 21.7791 10.7768 21.9991 12 21.9991C16.2996 21.9991 19.9651 19.2853 21.3779 15.4773H7.65216Z"
                fill="black"
            />
            <path
                d="M7.65216 8.52225L8.52173 2.6224C9.60501 2.22041 10.7768 2.00049 12 2.00049C16.2996 2.00049 19.9651 4.71424 21.3779 8.52225H7.65216Z"
                fill="#009E49"
            />
            <path
                d="M2.00037 12.0001C2.00037 16.2997 4.71416 19.9652 8.52212 21.3781V2.62207C4.71416 4.035 2.00037 7.70043 2.00037 12.0001Z"
                fill="#CE1126"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolUnitedArabEmirates__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolUnitedArabEmirates {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
