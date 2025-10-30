import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-symbol-bulgaria',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SymbolBulgaria"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgSymbolBulgaria__a)">
      <path
        d="M22.0001 12.0004C22.0001 10.7772 21.7801 9.60549 21.3781 8.52221L12.0001 8.0874L2.62205 8.52217C2.2201 9.60549 2.00006 10.7772 2.00006 12.0004C2.00006 13.2236 2.2201 14.3954 2.62205 15.4787L12.0001 15.9135L21.3781 15.4787C21.7801 14.3954 22.0001 13.2236 22.0001 12.0004Z"
        fill="#00966E"
      />
      <path
        d="M11.9999 21.9998C16.2995 21.9998 19.965 19.286 21.3779 15.478H2.62189C4.03482 19.286 7.70025 21.9998 11.9999 21.9998Z"
        fill="#D80027"
      />
      <path
        d="M2.62189 8.52127H21.3779C19.965 4.71326 16.2995 1.99951 11.9999 1.99951C7.70025 1.99951 4.03482 4.71326 2.62189 8.52127Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="SvgSymbolBulgaria__a">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSymbolBulgaria {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
