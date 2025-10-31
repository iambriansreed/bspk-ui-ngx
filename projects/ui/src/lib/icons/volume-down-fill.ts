import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-volume-down-fill',
    template: `<svg
        [style.width]="width"
        data-bspk-name="VolumeDownFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M360-360H240q-17 0-28.5-11.5T200-400v-160q0-17 11.5-28.5T240-600h120l132-132q19-19 43.5-8.5T560-703v446q0 27-24.5 37.5T492-228L360-360Zm380-120q0 42-19 79.5T671-339q-10 6-20.5.5T640-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80Z"
        />
    </svg>`,
    styles: ['icon-volume-down-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconVolumeDownFill {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
