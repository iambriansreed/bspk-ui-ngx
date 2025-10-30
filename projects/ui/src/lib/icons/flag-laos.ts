import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-laos',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagLaos"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagLaos__a)">
      <path d="M1.5 5H22.5V19H1.5V5Z" fill="#0052B4" />
      <path
        d="M1.5 5.00415H22.5V8.71702H1.5V5.00415ZM1.5 15.2872H22.5V19.0001H1.5V15.2872Z"
        fill="#D80027"
      />
      <path
        d="M12 14.6976C13.4899 14.6976 14.6977 13.4898 14.6977 11.9999C14.6977 10.51 13.4899 9.30225 12 9.30225C10.5102 9.30225 9.30237 10.51 9.30237 11.9999C9.30237 13.4898 10.5102 14.6976 12 14.6976Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="SvgFlagLaos__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagLaos {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
