// create an angular service to manage theme setting and getting
import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

const THEME_KEY = 'theme-preference';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    document = inject(DOCUMENT);

    readonly value = signal<Theme>((localStorage.getItem(THEME_KEY) as Theme) || 'light');

    constructor() {
        effect(() => {
            const theme = this.value();
            this.document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(THEME_KEY, theme);
        });
    }

    toggle(): void {
        const newTheme: Theme = this.value() === 'dark' ? 'light' : 'dark';
        this.value.set(newTheme);
    }
}
