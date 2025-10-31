import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-view-column2',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ViewColumn2"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M600-120q-33 0-56.5-23.5T520-200v-560q0-33 23.5-56.5T600-840h160q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600Zm0-640v560h160v-560H600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h160q33 0 56.5 23.5T440-760v560q0 33-23.5 56.5T360-120H200Zm0-640v560h160v-560H200Zm560 0H600h160Zm-400 0H200h160Z"
        />
    </svg>`,
    styles: ['icon-view-column2 { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconViewColumn2 {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
