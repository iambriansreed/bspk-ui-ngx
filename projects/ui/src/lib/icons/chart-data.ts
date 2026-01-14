import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-chart-data',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ChartData"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="m418-441 52 52q11 11 28 11t28-11l114-114v24q0 17 11.5 28t28.5 11q17 0 28.5-11.5T720-480v-120q0-17-11.5-28.5T680-640H559q-17 0-28 11.5T520-600q0 17 11.5 28.5T560-560h23l-85 86-52-52q-11-12-28-12t-28 12L268-404q-12 11-12 28t12 28q11 12 28 12t28-12l94-93ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </svg>`,
    styles: ['icon-chart-data { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconChartData {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
