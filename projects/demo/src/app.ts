import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIButton } from '@ui/button';
import { IconDarkMode } from '@ui/icons/dark-mode';
import { IconDarkModeFill } from '@ui/icons/dark-mode-fill';
import { ThemeService } from '@ui/services/theme';
import { AppNavComponent } from './components/app-nav';
import { META } from './meta';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppNavComponent, UIButton],
    template: `<div data-body-width="true" data-navbar="true">
            <span data-backdrop="true"></span>
            <div data-header="true">
                <h2 data-brand="true">
                    <a data-name="true" href="/bspk-ui-ngx" data-bspk="link" data-subtle="true" target="_self"
                        ><span>BSPK</span></a
                    ><span>Version: {{ version }}</span>
                    <span>({{ hash }})</span>
                </h2>
            </div>
            <div data-navbar-right>
                <ui-button
                    [icon]="toggleDarkModeIcon()"
                    (click)="toggleDarkMode()"
                    [label]="toggleDarkModeLabel()"
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
    version = META.version;
    hash = META.hash;
    toggleDarkModeLabel = computed(() => {
        return this.themeService.value() === 'light' ? 'Enable dark mode' : 'Disable dark mode';
    });

    toggleDarkModeIcon = computed(() => {
        return this.themeService.value() === 'light' ? IconDarkMode : IconDarkModeFill;
    });

    protected readonly themeService = inject(ThemeService);

    protected readonly title = signal('demo');

    toggleDarkMode() {
        this.themeService.toggle();
    }
}
