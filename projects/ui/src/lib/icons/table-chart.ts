import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-table-chart',
  template: `<svg
    [style.width]="width"
    data-bspk-name="TableChart"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120ZM200-640h560v-120H200v120Zm100 80H200v360h100v-360Zm360 0v360h100v-360H660Zm-80 0H380v360h200v-360Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconTableChart {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
