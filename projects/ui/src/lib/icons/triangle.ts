import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-triangle',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="Triangle"
        data-type="anywhere"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <path
            d="M3.80001 20C3.41667 20 3.12501 19.8292 2.92501 19.4875C2.72501 19.1458 2.73334 18.8083 2.95001 18.475L11.15 5.35C11.35 5.03333 11.6333 4.875 12 4.875C12.3667 4.875 12.65 5.03333 12.85 5.35L21.05 18.475C21.2667 18.8083 21.275 19.1458 21.075 19.4875C20.875 19.8292 20.5833 20 20.2 20H3.80001ZM5.60001 18H18.4L12 7.75L5.60001 18Z"
            fill="currentColor" />
    </svg>`,
    styles: ['icon-triangle { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTriangle {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
