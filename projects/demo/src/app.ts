import {
    Component,
    computed,
    inject,
    signal,
    ViewEncapsulation,
    OnInit,
    ElementRef,
    effect,
    DOCUMENT,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BRANDS } from '@bspk/styles/brands';
import { UIButton } from '@ui/button';
import { IconDarkMode } from '@ui/icons/dark-mode';
import { IconDarkModeFill } from '@ui/icons/dark-mode-fill';
import { Brand, BrandService, EXTRA_BRANDS } from '@ui/services/brand';
import { ThemeService } from '@ui/services/theme';
import { Subscription } from 'rxjs';
import { IconSearch, UISelect } from '../../ui/src';
import { AppNavComponent } from './components/nav';
import { AppNavContents } from './components/nav-contents';
import { META } from './meta';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AppNavComponent, UIButton, AppNavContents, UISelect],
    template: `<div data-body-width="true" data-navbar="true">
            <span data-backdrop="true"></span>
            <div data-header="true">
                <h2 data-brand="true">
                    <a data-name="true" href="/bspk-ui-ngx" data-bspk="link" data-subtle="true" target="_self"
                        ><span>BSPK</span></a
                    >
                    <span>NGX</span>
                    <span>Version: {{ version }}</span>
                    <span>({{ hash }})</span>
                </h2>
            </div>
            <div data-navbar-right>
                <ui-button
                    variant="secondary"
                    [icon]="toggleDarkModeIcon()"
                    (click)="toggleDarkMode()"
                    [label]="toggleDarkModeLabel()"
                    [iconOnly]="true" />

                <div data-brand-dropdown>
                    <ui-select
                        aria-label="Brand"
                        id="brand-dropdown"
                        name="brand"
                        (valueChange)="handleBrandChange($event)"
                        [items]="brandItems"
                        style="width: 280px"
                        [value]="brand()" />
                </div>
                <!-- <ui-button
                    [attr.data-search-button]="true"
                    label="Search... ⌘K"
                    (click)="searchModalOpen.set(true)"
                    variant="secondary">
                    <icon-search />
                    Search... ⌘K
                </ui-button> -->
                <!-- <search-model (onClose)="searchModalOpen.set(false)" [open]="searchModalOpen()" /> -->
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
    IconSearch = IconSearch;

    version = META.version;
    hash = META.hash;

    toggleDarkModeLabel = computed(() => {
        return this.themeService.value() === 'light' ? 'Enable dark mode' : 'Disable dark mode';
    });

    toggleDarkModeIcon = computed(() => {
        return this.themeService.value() === 'light' ? IconDarkMode : IconDarkModeFill;
    });

    brand = computed(() => {
        return this.brandService.value();
    });

    brandItems = Object.values([...BRANDS, ...EXTRA_BRANDS]).map((brand) => ({
        label: brand.title,
        value: brand.slug,
    }));

    searchModalOpen = signal(false);

    protected readonly title = signal('demo');
    protected readonly themeService = inject(ThemeService);
    protected readonly router = inject(Router);
    protected readonly route = inject(ActivatedRoute);
    protected readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
    protected readonly document = inject(DOCUMENT);
    protected readonly brandService = inject(BrandService);

    private routeSubscription: Subscription | null = null;
    private fragmentSubscription: Subscription | null = null;

    constructor() {
        effect(() => {
            const current = this.document.querySelector(`[data-syntax-theme='${this.themeService.value()}']`);
            const other = this.document.querySelector(
                `[data-syntax-theme]:not([data-syntax-theme='${this.themeService.value()}'])`,
            );
            current?.removeAttribute('disabled');
            other?.setAttribute('disabled', 'true');
        });
    }

    get location() {
        return globalThis.location;
    }

    handleBrandChange(brand: string | undefined) {
        this.brandService.value.set((brand as Brand) || 'anywhere');
    }

    toggleDarkMode() {
        this.themeService.toggle();
    }

    ngOnInit() {
        this.routeSubscription = this.router.events.subscribe(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        });

        this.fragmentSubscription = this.route.fragment.subscribe((fragment: string | null) => {
            const element = this.document.querySelector(`[id="${fragment}"]`);
            if (fragment && element) requestAnimationFrame(() => element.scrollIntoView({ behavior: 'smooth' }));
        });
    }

    onDestroy() {
        this.routeSubscription?.unsubscribe();
        this.fragmentSubscription?.unsubscribe();
    }
}
