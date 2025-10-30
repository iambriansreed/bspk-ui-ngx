import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-symbol-monaco',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SymbolMonaco"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgSymbolMonaco__a)">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="white"
      />
      <path d="M2 12C2 6.47719 6.47719 2 12 2C17.5228 2 22 6.47719 22 12" fill="#D80027" />
    </g>
    <defs>
      <clipPath id="SvgSymbolMonaco__a">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSymbolMonaco {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
