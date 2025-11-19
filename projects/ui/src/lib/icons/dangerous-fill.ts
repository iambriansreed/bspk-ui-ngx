import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-dangerous-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="DangerousFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M363-120q-16 0-30.5-6T307-143L143-307q-11-11-17-25.5t-6-30.5v-234q0-16 6-30.5t17-25.5l164-164q11-11 25.5-17t30.5-6h234q16 0 30.5 6t25.5 17l164 164q11 11 17 25.5t6 30.5v234q0 16-6 30.5T817-307L653-143q-11 11-25.5 17t-30.5 6H363Zm117-304 86 86q11 11 28 11t28-11q11-11 11-28t-11-28l-86-86 86-86q11-11 11-28t-11-28q-11-11-28-11t-28 11l-86 86-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l86 86-86 86q-11 11-11 28t11 28q11 11 28 11t28-11l86-86Z" />
    </svg>`,
    styles: ['icon-dangerous-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconDangerousFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
