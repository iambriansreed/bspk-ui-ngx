import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-vertical-align-bottom',
    template: `<svg
        [style.width]="width"
        data-bspk-name="VerticalAlignBottom"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M200-120q-17 0-28.5-11.5T160-160q0-17 11.5-28.5T200-200h560q17 0 28.5 11.5T800-160q0 17-11.5 28.5T760-120H200Zm280-177q-8 0-15-2.5t-13-8.5L308-452q-11-11-11-28t11-28q11-11 28-11t28 11l76 76v-368q0-17 11.5-28.5T480-840q17 0 28.5 11.5T520-800v368l76-76q11-11 28-11t28 11q11 11 11 28t-11 28L508-308q-6 6-13 8.5t-15 2.5Z"
        />
    </svg>`,
    styles: ['icon-vertical-align-bottom { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconVerticalAlignBottom {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
