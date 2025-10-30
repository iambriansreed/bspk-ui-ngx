import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-incomplete-circle',
  template: `<svg
    [style.width]="width"
    data-bspk-name="IncompleteCircle"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-84 31-156.5T196-764l284 284v-400q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconIncompleteCircle {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
