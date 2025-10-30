import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-colombia',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagColombia"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagColombia__a)">
      <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#FFDA44" />
      <path d="M1.5 15.5723H22.5V18.9998H1.5V15.5723Z" fill="#D80027" />
      <path d="M1.5 12H22.5V15.5723H1.5V12Z" fill="#0052B4" />
    </g>
    <defs>
      <clipPath id="SvgFlagColombia__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagColombia {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
