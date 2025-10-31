import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-square-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SquareFill"
        data-filled="true"
        data-type="anywhere"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"
            fill="currentColor"
        />
    </svg>`,
    styles: ['icon-square-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSquareFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
