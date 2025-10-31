import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-pie-chart-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="PieChartFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M520-520v-356q143 15 241.5 114T876-520H520ZM441-85q-152-15-254.5-128T84-480q0-155 102.5-268T441-876v791Zm79 0v-356h356q-14 143-113.5 242.5T520-85Z"
        />
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconPieChartFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
