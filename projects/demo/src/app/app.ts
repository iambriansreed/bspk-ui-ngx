import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIButton } from '../../../ui/src/lib/button';
import { IconDarkMode } from '../../../ui/src/lib/icons/dark-mode';
import { IconDarkModeFill } from '../../../ui/src/lib/icons/dark-mode-fill';
import { AppNavComponent } from './components/app-nav';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppNavComponent, UIButton],
    template: `<div data-body-width="true" data-navbar="true">
            <span data-backdrop="true"></span>
            <div data-header="true">
                <h2 data-brand="true">
                    <a data-name="true" href="/bspk-ui-ngx" data-bspk="link" data-subtle="true" target="_self"
                        ><span>BSPK</span></a
                    ><span>Version: x</span>
                </h2>
            </div>
            <div data-navbar-right>
                <ui-button
                    [icon]="toggleDarkModeIcon"
                    (click)="toggleDarkMode()"
                    [label]="toggleDarkModeLabel"
                    [iconOnly]="true" />
            </div>
        </div>
        <nav data-navigation>
            <app-nav />
        </nav>
        <main data-main>
            <div data-component-page data-page>
                <router-outlet />
            </div>
        </main> `,
    encapsulation: ViewEncapsulation.None,
})
export class App {
    theme = signal<'dark' | 'light'>('light');

    protected readonly title = signal('demo');

    get toggleDarkModeIcon() {
        return this.theme() === 'light' ? IconDarkMode : IconDarkModeFill;
    }

    get toggleDarkModeLabel() {
        return this.theme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
    }

    toggleDarkMode() {
        const newTheme = this.theme() === 'light' ? 'dark' : 'light';
        this.theme.set(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }
}
