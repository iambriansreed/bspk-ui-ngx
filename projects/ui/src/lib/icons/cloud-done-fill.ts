import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-cloud-done-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="CloudDoneFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="m413-395-56-56q-12-12-28-12t-28 12q-12 12-12 28.5t12 28.5l85 86q12 12 28 12t28-12l169-169q12-12 12-29t-12-29q-12-12-29-12t-29 12L413-395ZM260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Z" />
    </svg>`,
    styles: ['icon-cloud-done-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconCloudDoneFill {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
