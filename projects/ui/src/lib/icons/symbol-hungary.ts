import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-symbol-hungary',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SymbolHungary"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgSymbolHungary__a)">
      <path
        d="M2.62163 8.52094C2.21967 9.6043 1.99963 10.776 1.99963 11.9992C1.99963 13.2224 2.21967 14.3941 2.62163 15.4774L11.9996 16.347L21.3776 15.4774C21.7796 14.3941 21.9996 13.2224 21.9996 11.9992C21.9996 10.776 21.7796 9.6043 21.3776 8.52094L11.9996 7.65137L2.62163 8.52094Z"
        fill="white"
      />
      <path
        d="M12.0003 1.99927C7.70073 1.99927 4.03527 4.71302 2.62238 8.52103H21.3784C19.9654 4.71302 16.3 1.99927 12.0003 1.99927Z"
        fill="#D80027"
      />
      <path
        d="M12.0003 21.9993C16.3 21.9993 19.9654 19.2855 21.3784 15.4775H2.62238C4.03527 19.2855 7.70073 21.9993 12.0003 21.9993Z"
        fill="#6DA544"
      />
    </g>
    <defs>
      <clipPath id="SvgSymbolHungary__a">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSymbolHungary {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
