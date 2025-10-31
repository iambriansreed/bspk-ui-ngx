import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-symbol-maldives',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SymbolMaldives"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgSymbolMaldives__a)">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#D01920"
            />
            <path d="M18.5216 7.21753H5.47815V16.7828H18.5216V7.21753Z" fill="#017C3B" />
            <path
                d="M13.6102 14.8261C12.0494 14.8261 10.7841 13.5608 10.7841 12C10.7841 10.4392 12.0494 9.17392 13.6102 9.17392C14.0968 9.17392 14.5547 9.29696 14.9545 9.5136C14.3274 8.90028 13.4697 8.52173 12.5232 8.52173C10.6023 8.52173 9.04498 10.079 9.04498 12C9.04498 13.9209 10.6023 15.4782 12.5232 15.4782C13.4697 15.4782 14.3274 15.0997 14.9545 14.4863C14.5547 14.7031 14.0968 14.8261 13.6102 14.8261Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="SvgSymbolMaldives__a">
                <rect width="20" height="20" fill="white" transform="translate(2 2)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-symbol-maldives { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSymbolMaldives {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
