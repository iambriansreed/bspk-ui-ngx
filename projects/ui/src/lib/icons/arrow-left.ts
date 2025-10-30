import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-arrow-left',
  template: `<svg
    [style.width]="width"
    data-bspk-name="ArrowLeft"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="M526-314 381-459q-5-5-7-10t-2-11q0-6 2-11t7-10l145-145q3-3 6.5-4.5t7.5-1.5q8 0 14 5.5t6 14.5v304q0 9-6 14.5t-14 5.5q-2 0-14-6Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconArrowLeft {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
