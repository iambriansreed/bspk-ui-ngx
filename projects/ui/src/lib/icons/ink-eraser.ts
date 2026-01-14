import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-ink-eraser',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="InkEraser"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M690-240h150q17 0 28.5 11.5T880-200q0 17-11.5 28.5T840-160H610l80-80Zm-483 80q-8 0-15.5-3t-13.5-9l-73-73q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L532-172q-6 6-13.5 9t-15.5 3H207Zm279-80 314-322-198-198-442 456 64 64h262Zm-6-240Z" />
    </svg>`,
    styles: ['icon-ink-eraser { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconInkEraser {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
