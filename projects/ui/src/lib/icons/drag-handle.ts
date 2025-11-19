import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-drag-handle',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="DragHandle"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M200-360q-17 0-28.5-11.5T160-400q0-17 11.5-28.5T200-440h560q17 0 28.5 11.5T800-400q0 17-11.5 28.5T760-360H200Zm0-160q-17 0-28.5-11.5T160-560q0-17 11.5-28.5T200-600h560q17 0 28.5 11.5T800-560q0 17-11.5 28.5T760-520H200Z" />
    </svg>`,
    styles: ['icon-drag-handle { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconDragHandle {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
