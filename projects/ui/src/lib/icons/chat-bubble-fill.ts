import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-chat-bubble-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="ChatBubbleFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Z"
        />
    </svg>`,
    styles: ['icon-chat-bubble-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconChatBubbleFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
