// create an angular service to manage brand setting and getting
import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { BRANDS } from '@bspk/styles/brands';

const BRAND_KEY = 'brand-preference';

export type Brand = (typeof BRANDS)[number]['slug'] | 'example';

export const EXTRA_BRANDS: (typeof BRANDS)[number][] = [
    {
        title: 'Example' as any,
        slug: 'example' as any,
    },
];

@Injectable({
    providedIn: 'root',
})
export class BrandService {
    document = inject(DOCUMENT);

    readonly value = signal<Brand>((localStorage.getItem(BRAND_KEY) as Brand) || 'anywhere');

    constructor() {
        effect(() => {
            const brand = this.value();
            this.document.documentElement.setAttribute('data-brand', brand);
            localStorage.setItem(BRAND_KEY, brand);
            updateBrandStylesheet(brand);
        });
    }

    toggle(): void {
        const newBrand: Brand = this.value();
        this.value.set(newBrand);
    }
}

/**
 * Loads the brand stylesheet corresponding to the given brand value.
 *
 * 1. Appends the new brand stylesheet link element to the document head
 * 2. Once the stylesheet is loaded, it adds a 'loaded' class to the body to help mitigate F.O.U.C. (Flash of Unstyled
 *    Content)
 * 3. If a previous brand stylesheet exists (id of 'brand-stylesheet'), it removes it to ensure only the current brand's
 *    styles are applied.
 * 4. Adds an id of 'brand-stylesheet' to the link element for easy identification and management of the brand stylesheet.
 *
 * Once the stylesheet is loaded, it adds a 'loaded' class to the body to help mitigate F.O.U.C. (Flash of Unstyled
 * Content) when switching brands.
 *
 * Then it removes any previously loaded brand stylesheet to ensure that only the current brand's styles are applied.
 *
 * Then it
 *
 * @param value The brand value for which to load the stylesheet.
 */
export function updateBrandStylesheet(value: Brand): void {
    const linkElement = document.createElement('link');
    linkElement.onload = () => {
        // eslint-disable-next-line no-console
        console.info(`Brand ${value} stylesheet loaded`);
        document.body.classList.add('loaded');
        // remove any previous brand stylesheets
        const existingLinks = document.querySelector('link#brand-stylesheet');
        existingLinks?.remove();
        linkElement.id = 'brand-stylesheet';
    };
    linkElement.rel = 'stylesheet';
    linkElement.href = value === 'example' ? `/example.css` : `/brands/${value}.css`;
    document.head.appendChild(linkElement);
}
