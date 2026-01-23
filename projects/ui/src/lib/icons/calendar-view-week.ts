import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-calendar-view-week',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="CalendarViewWeek"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm360-80h100v-480H520v480Zm-180 0h100v-480H340v480Zm-180 0h100v-480H160v480Zm540 0h100v-480H700v480Z" />
    </svg>`,
    styles: ['icon-calendar-view-week { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconCalendarViewWeek {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
