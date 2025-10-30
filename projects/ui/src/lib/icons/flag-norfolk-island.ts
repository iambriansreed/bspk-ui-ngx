import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-norfolk-island',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagNorfolkIsland"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagNorfolkIsland__a)">
      <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
      <path
        d="M1.5 5H8.5V19H1.5V5ZM15.5 5H22.5V19H15.5V5ZM13.9444 14.2717L11.9795 8.04946L10.0146 14.2717H11.4883V15.9091H12.4708V14.2717H13.9444Z"
        fill="#007B23"
      />
    </g>
    <defs>
      <clipPath id="SvgFlagNorfolkIsland__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagNorfolkIsland {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
