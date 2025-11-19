import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-united-kingdom-of-great-britain-and-northern-ireland',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagUnitedKingdomOfGreatBritainAndNorthernIreland"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagUnitedKingdomOfGreatBritainAndNorthernIreland__a)">
            <path d="M1.5 5.00439H22.5V19.0044H1.5V5.00439Z" fill="white" />
            <path
                d="M10.6467 10.6H1.5V13.4H10.6467V19H13.4467V13.4H22.5933V10.6H13.4467V5H10.6467V10.6Z"
                fill="#D80027" />
        </g>
        <defs>
            <clipPath id="SvgFlagUnitedKingdomOfGreatBritainAndNorthernIreland__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-united-kingdom-of-great-britain-and-northern-ireland { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagUnitedKingdomOfGreatBritainAndNorthernIreland {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
