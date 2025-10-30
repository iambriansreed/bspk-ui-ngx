import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-gambia',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagGambia"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagGambia__a)">
      <path d="M1.5 5.00024H22.5V19H1.5V5.00024Z" fill="white" />
      <path d="M1.5 14.7393H22.5V19H1.5V14.7393Z" fill="#1A7E25" />
      <path d="M1.5 5.00024H22.5V9.287H1.5V5.00024Z" fill="#A2001D" />
      <path d="M1.5 10.1492H22.5V13.8265H1.5V10.1492Z" fill="#0052B4" />
    </g>
    <defs>
      <clipPath id="SvgFlagGambia__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagGambia {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
