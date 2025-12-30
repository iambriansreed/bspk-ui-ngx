// create an angular service to manage theme setting and getting
import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    document = inject(DOCUMENT);

    readonly value = signal<Theme>('light');

    private readonly themeKey = 'theme-preference';

    constructor() {
        effect(() => {
            const theme = this.value();
            this.document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(this.themeKey, theme);
        });
    }

    toggle(): void {
        const newTheme: Theme = this.value() === 'dark' ? 'light' : 'dark';
        this.value.set(newTheme);
    }
}
