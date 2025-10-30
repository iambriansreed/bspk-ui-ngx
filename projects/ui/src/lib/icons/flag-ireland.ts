import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-ireland',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagIreland"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagIreland__a)">
      <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="white" />
      <path d="M15.0436 5H22.5V19.0002H15.0436V5Z" fill="#009E60" />
      <path d="M1.5 5H8.95636V19.0002H1.5V5Z" fill="#F77F00" />
    </g>
    <defs>
      <clipPath id="SvgFlagIreland__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagIreland {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
