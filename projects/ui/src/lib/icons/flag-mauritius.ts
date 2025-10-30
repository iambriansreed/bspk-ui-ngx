import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-mauritius',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagMauritius"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagMauritius__a)">
      <path d="M1.5 5H22.5V18.9997H1.5V5Z" fill="#F7CE00" />
      <path d="M1.5 5H22.5V8.50015H1.5V5Z" fill="#D80027" />
      <path d="M1.5 8.49951H22.5V11.9997H1.5V8.49951Z" fill="#191F6A" />
      <path d="M1.5 15.5H22.5V19.0002H1.5V15.5Z" fill="#00A04E" />
    </g>
    <defs>
      <clipPath id="SvgFlagMauritius__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagMauritius {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
