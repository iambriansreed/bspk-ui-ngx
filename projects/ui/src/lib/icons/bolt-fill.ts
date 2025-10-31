import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-bolt-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="BoltFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M360-360H236q-24 0-35.5-21.5T203-423l299-430q10-14 26-19.5t33 .5q17 6 25 21t6 32l-32 259h155q26 0 36.5 23t-6.5 43L416-100q-11 13-27 17t-31-3q-15-7-23.5-21.5T328-139l32-221Z"
        />
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconBoltFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
