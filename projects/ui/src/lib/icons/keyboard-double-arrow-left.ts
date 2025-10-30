import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-keyboard-double-arrow-left',
  template: `<svg
    [style.width]="width"
    data-bspk-name="KeyboardDoubleArrowLeft"
    data-type="material"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 -960 960 960"
  >
    <path
      d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z"
    />
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconKeyboardDoubleArrowLeft {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
