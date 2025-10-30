import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-burkina-faso',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagBurkinaFaso"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagBurkinaFaso__a)">
      <path d="M1.5 5H22.5V19H1.5V5Z" fill="#3D944F" />
      <path d="M1.5 5H22.5V12H1.5V5Z" fill="#D80027" />
      <path
        d="M11.9795 9.2002L12.6713 11.3289H14.9105L13.1012 12.647L13.7889 14.7756L11.9795 13.4616L10.1702 14.7756L10.8579 12.647L9.04852 11.3289H11.2877L11.9795 9.2002Z"
        fill="#FFDA44"
      />
    </g>
    <defs>
      <clipPath id="SvgFlagBurkinaFaso__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagBurkinaFaso {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
