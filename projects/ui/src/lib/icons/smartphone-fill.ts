import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-smartphone-fill',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SmartphoneFill"
    data-filled="true"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-200h400v-480H280v480Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSmartphoneFill {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
