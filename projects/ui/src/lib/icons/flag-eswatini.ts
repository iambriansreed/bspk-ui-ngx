import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-flag-eswatini',
    template: `<svg
        [style.width]="width"
        data-bspk-name="FlagEswatini"
        data-type="country"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
    >
        <g clip-path="url(#SvgFlagEswatini__a)">
            <path d="M1.5 5H22.5V19H1.5V5Z" fill="#2B5DEA" />
            <path d="M1.5 7.3335H22.5V16.6668H1.5V7.3335Z" fill="#FFDF29" />
            <path d="M1.5 8.5H22.5V15.5H1.5V8.5Z" fill="#D70000" />
            <path
                d="M12 8.99951V15.0008C14.667 15.0008 15.9993 13.0012 17.0003 12.0002C15.9993 10.9992 14.667 8.99951 12 8.99951Z"
                fill="white"
            />
            <path
                d="M12 8.99951C9.6667 8.99951 8.00069 10.9992 6.99969 12.0002C8.00069 13.0012 9.6667 15.0008 12 15.0008V8.99951Z"
                fill="black"
            />
            <path
                d="M9.58032 10.9336H10.0703V13.0639H9.58032V10.9336ZM10.7913 10.9336H11.2813V13.0639H10.7913V10.9336Z"
                fill="white"
            />
            <path
                d="M12.6487 10.9336H13.1387V13.0639H12.6487V10.9336ZM13.8597 10.9336H14.3497V13.0639H13.8597V10.9336Z"
                fill="black"
            />
        </g>
        <defs>
            <clipPath id="SvgFlagEswatini__a">
                <rect width="21" height="14" fill="white" transform="translate(1.5 5)" />
            </clipPath>
        </defs>
    </svg>`,
    styles: [':host { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconFlagEswatini {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
