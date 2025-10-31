import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-align-flex-end',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="AlignFlexEnd"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M120-80q-17 0-28.5-11.5T80-120q0-17 11.5-28.5T120-160h720q17 0 28.5 11.5T880-120q0 17-11.5 28.5T840-80H120Zm340-160q-17 0-28.5-11.5T420-280v-480q0-17 11.5-28.5T460-800h40q17 0 28.5 11.5T540-760v480q0 17-11.5 28.5T500-240h-40Z"
        />
    </svg>`,
    styles: ['icon-align-flex-end { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconAlignFlexEnd {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
