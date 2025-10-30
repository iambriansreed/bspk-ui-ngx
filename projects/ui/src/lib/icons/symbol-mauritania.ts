import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-symbol-mauritania',
  template: `<svg
    [style.width]="width"
    data-bspk-name="SymbolMauritania"
    data-type="country"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#SvgSymbolMauritania__a)">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="#496E2D"
      />
      <path
        d="M11.9997 13.553C10.3346 13.553 8.94363 12.3828 8.60234 10.8201C8.54992 11.0603 8.52148 11.3094 8.52148 11.5655C8.52148 13.4865 10.0787 15.0437 11.9997 15.0437C13.9207 15.0437 15.478 13.4865 15.478 11.5655C15.478 11.3094 15.4495 11.0603 15.3971 10.8201C15.0558 12.3828 13.6648 13.553 11.9997 13.553Z"
        fill="#FFDA44"
      />
      <path
        d="M11.9999 8.95654L12.3236 9.95299H13.3714L12.5238 10.5688L12.8475 11.5653L11.9999 10.9494L11.1522 11.5653L11.476 10.5688L10.6284 9.95299H11.6761L11.9999 8.95654Z"
        fill="#FFDA44"
      />
    </g>
    <defs>
      <clipPath id="SvgSymbolMauritania__a">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>`,
  styles: [':host { display: contents; }'],
})
export class IconSymbolMauritania {
  @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
