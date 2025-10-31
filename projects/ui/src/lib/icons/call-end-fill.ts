import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-call-end-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="CallEndFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M480-640q118 0 232.5 47.5T916-450q12 12 12 28t-12 28l-92 90q-11 11-25.5 12t-26.5-8l-116-88q-8-6-12-14t-4-18v-114q-38-12-78-19t-82-7q-42 0-82 7t-78 19v114q0 10-4 18t-12 14l-116 88q-12 9-26.5 8T136-304l-92-90q-12-12-12-28t12-28q88-95 203-142.5T480-640Z"
        />
    </svg>`,
    styles: ['icon-call-end-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconCallEndFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
