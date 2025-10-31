import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-send',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="Send"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M792-443 176-183q-20 8-38-3.5T120-220v-520q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37ZM200-280l474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
        />
    </svg>`,
    styles: ['icon-send { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSend {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
