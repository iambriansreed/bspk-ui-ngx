import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-play-pause',
  template: `<svg
    [style.width]="width"
    data-bspk-name="PlayPause"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path d="M200-312v-336l240 168-240 168Zm320-8v-320h80v320h-80Zm160 0v-320h80v320h-80Z" />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconPlayPause {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
