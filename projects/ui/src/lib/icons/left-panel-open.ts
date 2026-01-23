import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-left-panel-open',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="LeftPanelOpen"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M500-592v224q0 14 12 19t22-5l98-98q12-12 12-28t-12-28l-98-98q-10-10-22-5t-12 19ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
    </svg>`,
    styles: ['icon-left-panel-open { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLeftPanelOpen {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
