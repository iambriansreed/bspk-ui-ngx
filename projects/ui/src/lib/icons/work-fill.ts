import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-work-fill',
  template: `<svg
    [style.width]="width"
    data-bspk-name="WorkFill"
    data-filled="true"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconWorkFill {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
