import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-volume-mute',
    template: `<svg
        [style.width]="width"
        data-bspk-name="VolumeMute"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M440-360H320q-17 0-28.5-11.5T280-400v-160q0-17 11.5-28.5T320-600h120l132-132q19-19 43.5-8.5T640-703v446q0 27-24.5 37.5T572-228L440-360Zm-80-80h114l86 86v-252l-86 86H360v80Zm100-40Z"
        />
    </svg>`,
    styles: ['icon-volume-mute { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconVolumeMute {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
