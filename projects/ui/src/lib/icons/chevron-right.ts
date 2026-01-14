import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-chevron-right',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ChevronRight"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
    </svg>`,
    styles: ['icon-chevron-right { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconChevronRight {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
