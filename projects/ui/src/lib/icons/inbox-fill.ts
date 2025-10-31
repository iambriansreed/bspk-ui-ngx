import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-inbox-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="InboxFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm280-200q32 0 59-16.5t44-43.5q6-9 15-14.5t20-5.5h142v-360H200v360h142q11 0 20 5.5t15 14.5q17 27 44 43.5t59 16.5Z"
        />
    </svg>`,
    styles: ['icon-inbox-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconInboxFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
