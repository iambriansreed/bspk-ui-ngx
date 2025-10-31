import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-label-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="LabelFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M807-434 666-234q-11 16-28.5 25t-37.5 9H200q-33 0-56.5-23.5T120-280v-400q0-33 23.5-56.5T200-760h400q20 0 37.5 9t28.5 25l141 200q15 21 15 46t-15 46Z"
        />
    </svg>`,
    styles: ['icon-label-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLabelFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
