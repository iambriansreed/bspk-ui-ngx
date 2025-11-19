import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-leaderboard-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="LeaderboardFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M120-120q-17 0-28.5-11.5T80-160v-400q0-17 11.5-28.5T120-600h140q17 0 28.5 11.5T300-560v400q0 17-11.5 28.5T260-120H120Zm290 0q-17 0-28.5-11.5T370-160v-640q0-17 11.5-28.5T410-840h140q17 0 28.5 11.5T590-800v640q0 17-11.5 28.5T550-120H410Zm290 0q-17 0-28.5-11.5T660-160v-320q0-17 11.5-28.5T700-520h140q17 0 28.5 11.5T880-480v320q0 17-11.5 28.5T840-120H700Z" />
    </svg>`,
    styles: ['icon-leaderboard-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconLeaderboardFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
