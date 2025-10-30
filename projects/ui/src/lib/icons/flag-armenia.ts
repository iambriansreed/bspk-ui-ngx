import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-armenia',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagArmenia"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagArmenia__a)">
      <path d="M1.5 5H22.5V19H1.5V5Z" fill="#0052B4" />
      <path d="M1.5 5H22.5V9.66667H1.5V5Z" fill="#D80027" />
      <path d="M1.5 14.3335H22.5V19.0002H1.5V14.3335Z" fill="#FF9811" />
    </g>
    <defs>
      <clipPath id="SvgFlagArmenia__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagArmenia {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
