import { Component, ElementRef, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UIFab } from '@ui/fab';
import { IconLink } from '@ui/icons/link';
import { IconMenu } from '@ui/icons/menu';
import { UIPortalDirective } from '@ui/portal';
import { UITxtDirective } from '@ui/txt';
import { Subscription } from 'rxjs';
import { UICard, UIFloatingDirective, UILinkDirective, UIOutsideClickDirective } from '../../../ui/src';

interface NavItem {
    title: string;
    hash: string;
    level: number;
    element: HTMLElement;
}

/**
 * Displays the nav targets in the screen.
 *
 * All headers (h1-h6) within the main content area are used to build the nav.
 *
 * Use title attribute on headers to set the text used in the nav. If title is not set, the text content of the header
 * is used.
 *
 * If id is not set on the header, it will be generated from the title or text content.
 *
 * @name NavContents
 */
@Component({
    selector: 'app-nav-contents',
    standalone: true,
    imports: [
        UIFab,
        UITxtDirective,
        UIFloatingDirective,
        UIPortalDirective,
        IconLink,
        RouterLink,
        RouterLinkActive,
        UILinkDirective,
        UICard,
        UIOutsideClickDirective,
    ],
    template: `<ui-fab
            container="page"
            [icon]="IconMenu"
            [iconOnly]="true"
            label="On this page"
            (onClick)="open.set(!open())"
            (onMouseOver)="open.set(true)"
            placement="top-right"
            variant="neutral"
            #fab />
        @if (open()) {
            <ui-card
                data-nav-contents
                [ui-outside-click]="{ callback: toggleMenu(false) }"
                [ui-floating]="{ reference: reference() }"
                (onMouseLeave)="open.set(false)">
                <div ui-txt="body-small">On this page</div>
                <nav>
                    @for (link of menuItems; track link.hash) {
                        <a
                            ui-link
                            data-link
                            [attr.data-level]="link.level"
                            role="menuitem"
                            [routerLink]="location.pathname"
                            [fragment]="link.hash"
                            routerLinkActive="active"
                            class="nav-link"
                            variant="subtle"
                            [attr.data-selected]="location.hash === link.hash || undefined"
                            data-subtle>
                            {{ link.title }}
                        </a>
                    }
                </nav>
            </ui-card>
        }

        @for (link of menuItems; track link.hash) {
            <a
                [ui-portal]="link.element"
                [attr.aria-label]="link.title"
                data-nav-link
                [routerLink]="location.pathname"
                [fragment]="link.hash"
                [id]="link.hash.substring(1)">
                <icon-link />
            </a>
        } `,
})
export class AppNavContents implements OnInit, OnDestroy {
    IconMenu = IconMenu;

    menuItems: NavItem[] = [];

    open = signal(false);

    reference = signal<HTMLElement | null>(null);

    router = inject(Router);

    host = inject<ElementRef<HTMLElement>>(ElementRef);

    private routeSubscription: Subscription | null = null;

    get location() {
        return globalThis.location;
    }

    toggleMenu(isOpen: boolean) {
        return () => this.open.set(isOpen);
    }

    setMenuItems() {
        setTimeout(() => {
            const mainElement = document.querySelector<HTMLElement>('[data-main]')!;

            const nextMenuItems: NavItem[] = Array.from(
                mainElement.querySelectorAll<HTMLElement>(`h1, h2, h3, h4, h5, h6`) || [],
            )
                .filter((element) => {
                    // element does not exist in code playgrounds
                    return !element.closest('[data-code-editor]') && !element.closest('[data-example]');
                })
                .map((element) => {
                    const title = (element.title || element.textContent).trim();

                    element.id = element.id || slugify(title);

                    const next = {
                        title: title,
                        hash: `${element.id}`,
                        level: parseInt(element.tagName.substring(1), 10) - 2,
                        element,
                    };
                    element.dataset['navTarget'] = 'true';
                    return next;
                });

            // @ts-expect-error - ok
            globalThis.mainElement = mainElement;

            this.menuItems = nextMenuItems;
        }, 1000);
    }

    scrollToHash(hash: string = location.hash) {
        const id = hash.startsWith('#') ? hash.substring(1) : hash;
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    }

    ngOnInit() {
        const button = this.host.nativeElement.querySelector<HTMLElement>('button');
        this.reference.set(button);
        button?.setAttribute('data-nav-button', '');

        this.routeSubscription = this.router.events.subscribe(() => {
            this.open.set(false);

            this.setMenuItems();
        });

        this.setMenuItems();

        window.addEventListener('hashchange', () => this.scrollToHash());
    }

    ngOnDestroy() {
        this.routeSubscription?.unsubscribe();

        window.removeEventListener('hashchange', () => this.scrollToHash());
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */

export function slugify(value: string) {
    const slug = [value]
        .flat()
        .join('-')
        .toLowerCase()
        .replace(/[\s| |_/]/g, '-')
        .replace(/[^a-z0-9-]+/g, '')
        .replace(/[-]+/g, '-')
        .replace(/^[-]+/g, '')
        .replace(/[-]+$/g, '');

    return slug;
}
