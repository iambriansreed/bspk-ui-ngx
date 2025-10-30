import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-guernsey',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagGuernsey"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagGuernsey__a)">
      <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
      <path
        d="M14.1082 5H9.85088V9.85906H1.5V14.1164H9.85088V19H14.1082V14.1164H22.5V9.85906H14.1082V5Z"
        fill="#D80027"
      />
      <path
        d="M16.5889 12.6958L17.6532 13.404V10.5672L16.5889 11.2754H12.6877V7.37829L13.3959 6.31396H10.5632L11.2713 7.37829V11.2754H7.37017L6.30585 10.5672V13.404L7.37017 12.6958H11.2713V16.5929L10.5632 17.6572H13.3959L12.6877 16.5929V12.6958H16.5889Z"
        fill="#FFDA44"
      />
    </g>
    <defs>
      <clipPath id="SvgFlagGuernsey__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagGuernsey {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
