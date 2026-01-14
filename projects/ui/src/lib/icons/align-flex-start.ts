import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-align-flex-start',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="AlignFlexStart"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M120-800q-17 0-28.5-11.5T80-840q0-17 11.5-28.5T120-880h720q17 0 28.5 11.5T880-840q0 17-11.5 28.5T840-800H120Zm340 640q-17 0-28.5-11.5T420-200v-480q0-17 11.5-28.5T460-720h40q17 0 28.5 11.5T540-680v480q0 17-11.5 28.5T500-160h-40Z" />
    </svg>`,
    styles: ['icon-align-flex-start { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconAlignFlexStart {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
