import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-area-chart',
  template: `<svg
    [style.width]="width"
    data-bspk-name="AreaChart"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="m546-787 134 107h80q33 0 56.5 23.5T840-600v440H120v-440q0-25 22-36t42 4l96 72 151-211q20-28 54-33t61 17ZM200-520v144l120 96 160-220 280 218v-318H652L496-725 298-447l-98-73Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconAreaChart {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
