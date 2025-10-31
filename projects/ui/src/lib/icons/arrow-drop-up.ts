import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-arrow-drop-up',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ArrowDropUp"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M328-400q-9 0-14.5-6t-5.5-14q0-2 6-14l145-145q5-5 10-7t11-2q6 0 11 2t10 7l145 145q3 3 4.5 6.5t1.5 7.5q0 8-5.5 14t-14.5 6H328Z"
        />
    </svg>`,
    styles: ['icon-arrow-drop-up { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconArrowDropUp {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
