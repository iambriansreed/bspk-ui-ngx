import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-experiment',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="Experiment"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Zm-80 40h560L520-492v-268h-80v268L200-200Zm280-280Z" />
    </svg>`,
    styles: ['icon-experiment { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconExperiment {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
