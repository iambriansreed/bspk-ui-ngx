import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-flag-liberia',
  template: `<svg
    [style.width]="width"
    data-bspk-name="FlagLiberia"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgFlagLiberia__a)">
      <path
        d="M1.5 5H22.4591V6.2731H1.5V5ZM1.5 7.5462H22.4591V8.8193H1.5V7.5462ZM1.5 10.0965H22.4591V11.3696H1.5V10.0965ZM1.5 12.6468H22.4591V13.9199H1.5V12.6468ZM1.5 15.2053H22.4591V16.4784H1.5V15.2053ZM1.5 17.7269H22.4591V19H1.5V17.7269Z"
        fill="#BF0A30"
      />
      <path d="M1.5 5H7.86959V11.3696H1.5V5Z" fill="#002868" />
      <path
        d="M4.68477 6.23633L5.12278 7.58311H6.53915L5.39296 8.4182L5.83097 9.76498L4.68477 8.93399L3.53857 9.76498L3.97658 8.4182L2.83038 7.58311H4.24676L4.68477 6.23633Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="SvgFlagLiberia__a">
        <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconFlagLiberia {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
