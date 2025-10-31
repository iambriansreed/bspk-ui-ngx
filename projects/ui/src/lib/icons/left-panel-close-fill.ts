import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-left-panel-close-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="LeftPanelCloseFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M660-368v-224q0-14-12-19t-22 5l-98 98q-12 12-12 28t12 28l98 98q10 10 22 5t12-19ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm200-80h360v-560H400v560Z"
        />
    </svg>`,
    styles: ['icon-left-panel-close-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLeftPanelCloseFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
