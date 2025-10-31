import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-table-chart-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="TableChartFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M120-640v-120q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v120H120Zm80 520q-33 0-56.5-23.5T120-200v-360h180v440H200Zm460 0v-440h180v360q0 33-23.5 56.5T760-120H660Zm-280 0v-440h200v440H380Z"
        />
    </svg>`,
    styles: ['icon-table-chart-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTableChartFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
