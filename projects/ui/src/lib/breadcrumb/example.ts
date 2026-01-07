import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIBreadcrumb, BreadcrumbItem } from './breadcrumb';

@Component({
    selector: 'ui-breadcrumb-example',
    standalone: true,
    imports: [CommonModule, UIBreadcrumb],
    template: `
        <h2>Breadcrumb</h2>

        <h3>Minimum (2 Items)</h3>
        <p>The breadcrumb component requires at least 2 items to display</p>
        <ui-breadcrumb [items]="minimumItems" />

        <h3>5 Items</h3>
        <p>Standard breadcrumb with 5 items</p>
        <ui-breadcrumb [items]="fiveItems" />

        <h3>With Dropdown (6+ Items)</h3>
        <p>When more than 5 items are provided, the middle items collapse into a dropdown menu</p>
        <ui-breadcrumb [items]="manyItems" [scrollLimit]="5" />

        <h3>15 Items with Dropdown and Scroll</h3>
        <p>The dropdown menu becomes scrollable when there are many items</p>
        <ui-breadcrumb [items]="manyItemsExtended" [scrollLimit]="5" />
    `,
})
export class UIBreadcrumbExample {
    readonly minimumItems: BreadcrumbItem[] = [
        { label: 'Item 1', href: '#link-1' },
        { label: 'Item 2', href: '#link-2' },
    ];

    readonly fiveItems: BreadcrumbItem[] = [
        { label: 'Item 1', href: '#link-1' },
        { label: 'Item 2', href: '#link-2' },
        { label: 'Item 3', href: '#link-3' },
        { label: 'Item 4', href: '#link-4' },
        { label: 'Item 5', href: '#link-5' },
    ];

    readonly manyItems: BreadcrumbItem[] = [
        { label: 'Item 1', href: '#link-1' },
        { label: 'Item 2', href: '#link-2' },
        { label: 'Item 3', href: '#link-3' },
        { label: 'Item 4', href: '#link-4' },
        { label: 'Item 5', href: '#link-5' },
        { label: 'Item 6', href: '#link-6' },
    ];

    readonly manyItemsExtended: BreadcrumbItem[] = [
        { label: 'Brioche', href: '#brioche' },
        { label: 'Whole Wheat', href: '#whole-wheat' },
        { label: 'Sourdough', href: '#sourdough' },
        { label: 'Rye', href: '#rye' },
        { label: 'Multigrain', href: '#multigrain' },
        { label: 'Baguette', href: '#baguette' },
        { label: 'Focaccia', href: '#focaccia' },
        { label: 'Ciabatta', href: '#ciabatta' },
        { label: 'Pita', href: '#pita' },
        { label: 'Naan', href: '#naan' },
        { label: 'Flatbread', href: '#flatbread' },
        { label: 'Pumpernickel', href: '#pumpernickel' },
        { label: 'Cornbread', href: '#cornbread' },
        { label: 'Indian Bread', href: '#indian-bread' },
        { label: 'Tortilla', href: '#tortilla' },
    ];
}
