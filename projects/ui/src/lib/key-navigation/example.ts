import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIListItem } from '../list-item';
import { KeyNavigationUtilityProps, UIKeyNavigationDirective } from './';

@Component({
    selector: 'ui-outside-click-example',
    standalone: true,
    imports: [CommonModule, UIKeyNavigationDirective, UIListItem],
    template: `
        <h4>Single Button with Key Navigation</h4>
        <p>Click on an item below then use arrow keys to navigate between items in the menu.</p>
        <ui-menu [tabIndex]="0" [ui-key-navigation]="keyNavigationProps">
            @for (item of items; track item.id) {
                <ui-list-item
                    (onClick)="clickListItem(item)"
                    [label]="item.label"
                    [id]="item.id"
                    [active]="item.id === activeElementId()"
                    [tabIndex]="-1" />
            }
        </ui-menu>
    `,
})
export class UIKeyNavigationExample {
    items = [
        { label: 'Item 1', id: 'item-1' },
        { label: 'Item 2', id: 'item-2' },
        { label: 'Item 3', id: 'item-3' },
        { label: 'Item 4', id: 'item-4' },
        { label: 'Item 5', id: 'item-5' },
        { label: 'Item 6', id: 'item-6' },
    ];

    readonly activeElementId = signal<string | null>(null);

    keyNavigationProps: KeyNavigationUtilityProps = {
        activeElementId: this.activeElementId(),
        ids: this.items.map((i) => i.id),
        callback: ({ activeElementId }) => {
            this.activeElementId.set(activeElementId || null);
            return true;
        },
    };

    clickListItem(item: { id: string; label: string }) {
        sendSnackbar(`Clicked on ${item.label}`);
    }
}
