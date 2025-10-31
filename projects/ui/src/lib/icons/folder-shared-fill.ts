import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-folder-shared-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FolderSharedFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm280-120h320v-22q0-45-44-71.5T600-400q-72 0-116 26.5T440-302v22Zm160-160q33 0 56.5-23.5T680-520q0-33-23.5-56.5T600-600q-33 0-56.5 23.5T520-520q0 33 23.5 56.5T600-440Z"
        />
    </svg>`,
    styles: ['icon-folder-shared-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFolderSharedFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
