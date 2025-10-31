import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-stop-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="StopFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M240-320v-320q0-33 23.5-56.5T320-720h320q33 0 56.5 23.5T720-640v320q0 33-23.5 56.5T640-240H320q-33 0-56.5-23.5T240-320Z"
        />
    </svg>`,
    styles: ['icon-stop-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconStopFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
