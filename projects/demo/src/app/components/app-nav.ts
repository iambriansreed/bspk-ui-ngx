import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UILinkDirective } from '../../../../ui/src/lib/link';
import { routes } from '../app.routes';

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, UILinkDirective],
    template: `
        <div role="menu">
            @for (route of routes; track route.path) {
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

    trackByPath(_: number, route: any) {
        return route?.path ?? route?.title ?? _;
    }
}
