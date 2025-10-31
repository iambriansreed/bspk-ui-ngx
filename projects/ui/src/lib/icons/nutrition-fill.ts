import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-nutrition-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="NutritionFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M480-120q-117 0-198.5-81.5T200-400q0-94 55.5-168.5T401-669q-33-8-57.5-28.5T304-747q-15-29-21-63t-2-69q41-5 78 5t67 32q30 22 49.5 53t23.5 70q13-31 31.5-58.5T572-828q11-11 28-11t28 11q11 11 11 28t-11 28q-22 22-39 48.5T564-667q88 28 142 101.5T760-400q0 117-81.5 198.5T480-120Z"
        />
    </svg>`,
    styles: ['icon-nutrition-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconNutritionFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
