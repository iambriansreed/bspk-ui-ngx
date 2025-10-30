import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-send-fill',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SendFill"
    data-filled="true"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="M176-183q-20 8-38-3.5T120-220v-180l320-80-320-80v-180q0-22 18-33.5t38-3.5l616 260q25 11 25 37t-25 37L176-183Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSendFill {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
