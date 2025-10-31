import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-bookmark',
    template: `<svg
        [style.width]="width"
        data-bspk-name="Bookmark"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="m480-240-168 72q-40 17-76-6.5T200-241v-519q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v519q0 43-36 66.5t-76 6.5l-168-72Zm0-88 200 86v-518H280v518l200-86Zm0-432H280h400-200Z"
        />
    </svg>`,
    styles: ['icon-bookmark { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconBookmark {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
