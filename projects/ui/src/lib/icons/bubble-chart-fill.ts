import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-bubble-chart-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="BubbleChartFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M580-120q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm80-280q-92 0-156-64t-64-156q0-92 64-156t156-64q92 0 156 64t64 156q0 92-64 156t-156 64ZM280-240q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
    </svg>`,
    styles: ['icon-bubble-chart-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconBubbleChartFill {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
