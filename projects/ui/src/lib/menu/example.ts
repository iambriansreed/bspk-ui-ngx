import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { UIAvatar } from '../avatar/avatar';
import { UICheckbox } from '../checkbox';
import { UIDivider } from '../divider/divider';
import {
    IconSettings,
    IconMenuBook,
    IconHelp,
    IconLicense,
    IconLogout,
    IconDarkMode,
    IconDarkModeFill,
} from '../icons';
import { IconAccountCircle } from '../icons/account-circle';
import { UIListItem } from '../list-item/list-item';
import { UIMenu } from './menu';

@Component({
    selector: 'ui-menu-example',
    standalone: true,
    imports: [
        CommonModule,
        UIMenu,
        UIListItem,
        UIDivider,
        UIAvatar,
        IconAccountCircle,
        IconSettings,
        IconDarkModeFill,
        IconDarkMode,
        UICheckbox,
        IconMenuBook,
        IconHelp,
        IconLicense,
        IconLogout,
    ],
    template: `
        <h3>Menu</h3>
        <ui-menu
            [label]="'User menu'"
            [width]="'332px'"
            [owner]="'menu'"
            [style]="'padding: var(--spacing-sizing-02);'">
            <ui-list-item [label]="'Michael Scott'" subText="michael.scott@email.com">
                <span data-leading>
                    <ui-avatar [image]="'/avatar-01.png'" [name]="'Michael Scott'"></ui-avatar>
                </span>
            </ui-list-item>
            <ui-divider [inset]="2" [padding]="true"></ui-divider>
            <ui-list-item as="a" href="/menu#/my-profile" label="My profile">
                <span data-leading>
                    <icon-account-circle></icon-account-circle>
                </span>
            </ui-list-item>
            <ui-list-item [label]="'Settings'" as="a" href="/menu#/settings">
                <span data-leading>
                    <icon-settings />
                </span>
            </ui-list-item>
            <ui-list-item as="label" [label]="'Dark mode'">
                <span data-leading>
                    @if (themeService.value() === 'light') {
                        <icon-dark-mode></icon-dark-mode>
                    } @else {
                        <icon-dark-mode-fill></icon-dark-mode-fill>
                    }
                </span>
                <span data-trailing>
                    <ui-checkbox
                        name="dark-mode"
                        aria-label="Toggle dark mode"
                        [checked]="themeService.value() === 'dark'"
                        (checkedChange)="themeService.toggle()"></ui-checkbox>
                </span>
            </ui-list-item>
            <ui-divider [inset]="2" [padding]="false"></ui-divider>
            <ui-list-item [label]="'Guide and tutorial'" as="a" href="/menu#/guide-and-tutorial">
                <span data-leading>
                    <icon-menu-book></icon-menu-book>
                </span>
            </ui-list-item>
            <ui-list-item [label]="'Help center'" as="a" href="/menu#/help-center">
                <span data-leading>
                    <icon-help></icon-help>
                </span>
            </ui-list-item>
            <ui-divider [inset]="2" [padding]="true"></ui-divider>
            <ui-list-item [label]="'Go premium'" as="a" href="/menu#/go-premium">
                <span data-leading>
                    <icon-license></icon-license>
                </span>
            </ui-list-item>
            <ui-list-item [label]="'Log out'" as="a" href="/menu#/log-out">
                <span data-leading>
                    <icon-logout></icon-logout>
                </span>
            </ui-list-item>
        </ui-menu>
    `,
})
export class UIMenuExample {
    protected readonly themeService = inject(ThemeService);
}
