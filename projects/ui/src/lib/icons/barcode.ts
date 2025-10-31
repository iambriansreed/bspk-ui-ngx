import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-barcode',
    template: `<svg
        [style.width]="width"
        data-bspk-name="Barcode"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M40-200v-560h80v560H40Zm120 0v-560h80v560h-80Zm120 0v-560h40v560h-40Zm120 0v-560h80v560h-80Zm120 0v-560h120v560H520Zm160 0v-560h40v560h-40Zm120 0v-560h120v560H800Z"
        />
    </svg>`,
    styles: ['icon-barcode { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconBarcode {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
