import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UILinkDirective } from '@ui/link';
import { routes } from '../app.routes';
import { META } from '../meta';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, UILinkDirective],
    template: `
        <div role="menu">
            <div data-header="true">Components</div>
            @for (route of componentRoutes; track route.path) {
                <a
                    ui-link
                    data-link
                    role="menuitem"
                    [routerLink]="route.path"
                    routerLinkActive="active"
                    class="nav-link"
                    variant="subtle">
                    {{ route.title }}
                </a>
            }
            <div data-header="true">Utility</div>
            @for (route of utilityRoutes; track route.path) {
                <a
                    ui-link
                    data-link
                    role="menuitem"
                    [routerLink]="route.path"
                    routerLinkActive="active"
                    class="nav-link"
                    variant="subtle">
                    {{ route.title }}
                </a>
            }
        </div>
    `,
    styles: [
        `
            :host {
                display: contents;
            }
        `,
    ],
})
export class AppNavComponent {
    routes = routes;

    allComponents = this.routes
        .filter((route) => route.data?.['component'])
        .sort(({ title: a }, { title: b }) => a!.localeCompare(b!));

    componentRoutes = this.allComponents.filter((r) => {
        return META.components.find((c) => c.name === r.data!['component'])?.phase !== 'Utility';
    });

    utilityRoutes = this.allComponents.filter((r) => {
        return META.components.find((c) => c.name === r.data!['component'])?.phase === 'Utility';
    });

    trackByPath(_: number, route: any) {
        return route?.path ?? route?.title ?? _;
    }
}
