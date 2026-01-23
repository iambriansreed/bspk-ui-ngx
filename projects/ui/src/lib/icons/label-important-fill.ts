import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-label-important-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="LabelImportantFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M267-200q-48 0-71-41.5t3-81.5l101-157-101-157q-26-40-3-81.5t71-41.5h333q20 0 37.5 9t28.5 25l141 200q15 21 15 46t-15 46L666-234q-11 16-28.5 25t-37.5 9H267Z" />
    </svg>`,
    styles: ['icon-label-important-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLabelImportantFill {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
