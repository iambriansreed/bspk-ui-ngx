import { Component, computed, inject, signal, ViewEncapsulation, OnInit, ElementRef, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UIButton } from '@ui/button';
import { IconDarkMode } from '@ui/icons/dark-mode';
import { IconDarkModeFill } from '@ui/icons/dark-mode-fill';
import { ThemeService } from '@ui/services/theme';
import { Subscription } from 'rxjs';
import { AppNavComponent } from './components/nav';
import { AppNavContents } from './components/nav-contents';
import { META } from './meta';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppNavComponent, UIButton, AppNavContents],
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
            @if (true) {
                <app-nav-contents />
            }
        </main> `,
    encapsulation: ViewEncapsulation.None,
})
export class App implements OnInit {
    version = META.version;
    hash = META.hash;
    toggleDarkModeLabel = computed(() => {
        return this.themeService.value() === 'light' ? 'Enable dark mode' : 'Disable dark mode';
    });

    toggleDarkModeIcon = computed(() => {
        return this.themeService.value() === 'light' ? IconDarkMode : IconDarkModeFill;
    });

    protected readonly title = signal('demo');
    protected readonly themeService = inject(ThemeService);
    protected readonly router = inject(Router);
    protected readonly route = inject(ActivatedRoute);
    protected readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

    private routeSubscription: Subscription | null = null;
    private fragmentSubscription: Subscription | null = null;

    constructor() {
        effect(() => {
            const current = document.querySelector(`[data-syntax-theme='${this.themeService.value()}']`);
            const other = document.querySelector(
                `[data-syntax-theme]:not([data-syntax-theme='${this.themeService.value()}'])`,
            );
            current?.removeAttribute('disabled');
            other?.setAttribute('disabled', 'true');
        });
    }

    get location() {
        return globalThis.location;
    }

    toggleDarkMode() {
        this.themeService.toggle();
    }

    ngOnInit() {
        this.routeSubscription = this.router.events.subscribe(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        });

        this.fragmentSubscription = this.route.fragment.subscribe((fragment: string | null) => {
            const element = document.querySelector(`[id="${fragment}"]`);
            if (fragment && element) {
                console.log('Fragment changed:', fragment, element);

                requestAnimationFrame(() => element.scrollIntoView({ behavior: 'smooth' }));
            }
        });
    }

    onDestroy() {
        this.routeSubscription?.unsubscribe();
        this.fragmentSubscription?.unsubscribe();
    }
}
