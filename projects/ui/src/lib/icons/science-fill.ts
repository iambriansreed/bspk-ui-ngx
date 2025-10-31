import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-science-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="ScienceFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Z"
        />
    </svg>`,
    styles: ['icon-science-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconScienceFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
