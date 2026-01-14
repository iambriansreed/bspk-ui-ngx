import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-iraq',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="FlagIraq"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none">
        <g clip-path="url(#SvgFlagIraq__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="white" />
            <path d="M1.5 5H22.5V9.66667H1.5V5Z" fill="#A2001D" />
            <path d="M1.5 14.3333H22.5V18.9999H1.5V14.3333Z" fill="black" />
            <path
                d="M10.4731 11.5783H9.27369C9.3351 11.3449 9.54387 11.173 9.79767 11.173V10.3584C9.04855 10.3584 8.4427 10.9683 8.4427 11.7134V12.3888H10.4731C10.5468 12.3888 10.6082 12.4502 10.6082 12.5239V12.7941H7.89825V13.6087H11.4228V12.5239C11.4228 12.004 10.9971 11.5783 10.4731 11.5783ZM12.5035 12.7982V10.3584H11.693V13.6128H13.048V12.7982H12.5035ZM15.2135 12.7982V10.3584H14.4029V12.7982H14.1328V11.9876H13.3181V13.6128H15.7579V12.7982H15.2135Z"
                fill="#547C31" />
        </g>
        <defs>
            <clipPath id="SvgFlagIraq__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: ['icon-flag-iraq { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagIraq {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
