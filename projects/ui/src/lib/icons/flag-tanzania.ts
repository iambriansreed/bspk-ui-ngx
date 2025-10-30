import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-tanzania',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagTanzania"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagTanzania__a)">
      <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="#338AF3" />
      <path d="M1.5 19V5.00024H22.5" fill="#6DA544" />
      <path d="M22.5 7.74358V5.00024H18.3849L1.5 16.2566V19H5.6151L22.5 7.74358Z" fill="#FFDA44" />
      <path d="M22.5 5.00024V6.646L3.96886 19H1.5V17.3542L20.0312 5.00024H22.5Z" fill="black" />
    </g>
    <defs>
      <clipPath id="SvgFlagTanzania__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagTanzania {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
