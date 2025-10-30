import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-symbol-burkina-faso',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SymbolBurkinaFaso"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgSymbolBurkinaFaso__a)">
      <path
        d="M2 12C2 6.47719 6.47719 2 12 2C17.5228 2 22 6.47719 22 12C21.5652 12 12 13.3043 12 13.3043L2 12Z"
        fill="#D80027"
      />
      <path
        d="M22 12.0005C22 17.5233 17.5228 22.0005 12 22.0005C6.47719 22.0005 2 17.5233 2 12.0005"
        fill="#3D944F"
      />
      <path
        d="M12 8.521L12.7553 10.8459H15.2001L13.2223 12.2829L13.9777 14.6079L12 13.171L10.0222 14.6079L10.7777 12.2829L8.79987 10.8459H11.2446L12 8.521Z"
        fill="#FFDA44"
      />
    </g>
    <defs>
      <clipPath id="SvgSymbolBurkinaFaso__a">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSymbolBurkinaFaso {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
