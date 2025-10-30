import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-indonesia',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagIndonesia"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagIndonesia__a)">
      <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
      <path d="M1.5 5H22.5V12H1.5V5Z" fill="#EE0000" />
    </g>
    <defs>
      <clipPath id="SvgFlagIndonesia__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagIndonesia {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
