import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIBreadcrumb, BreadcrumbItem } from './';

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
        { label: 'Item 1', href: 'breadcrumb/#link-1' },
        { label: 'Item 2', href: 'breadcrumb/#link-2' },
    ];

    readonly fiveItems: BreadcrumbItem[] = [
        { label: 'Item 1', href: 'breadcrumb/#link-1' },
        { label: 'Item 2', href: 'breadcrumb/#link-2' },
        { label: 'Item 3', href: 'breadcrumb/#link-3' },
        { label: 'Item 4', href: 'breadcrumb/#link-4' },
        { label: 'Item 5', href: 'breadcrumb/#link-5' },
    ];

    readonly manyItems: BreadcrumbItem[] = [
        { label: 'Item 1', href: 'breadcrumb/#link-1' },
        { label: 'Item 2', href: 'breadcrumb/#link-2' },
        { label: 'Item 3', href: 'breadcrumb/#link-3' },
        { label: 'Item 4', href: 'breadcrumb/#link-4' },
        { label: 'Item 5', href: 'breadcrumb/#link-5' },
        { label: 'Item 6', href: 'breadcrumb/#link-6' },
    ];

    readonly manyItemsExtended: BreadcrumbItem[] = [
        { label: 'Brioche', href: 'breadcrumb/#brioche' },
        { label: 'Whole Wheat', href: 'breadcrumb/#whole-wheat' },
        { label: 'Sourdough', href: 'breadcrumb/#sourdough' },
        { label: 'Rye', href: 'breadcrumb/#rye' },
        { label: 'Multigrain', href: 'breadcrumb/#multigrain' },
        { label: 'Baguette', href: 'breadcrumb/#baguette' },
        { label: 'Focaccia', href: 'breadcrumb/#focaccia' },
        { label: 'Ciabatta', href: 'breadcrumb/#ciabatta' },
        { label: 'Pita', href: 'breadcrumb/#pita' },
        { label: 'Naan', href: 'breadcrumb/#naan' },
        { label: 'Flatbread', href: 'breadcrumb/#flatbread' },
        { label: 'Pumpernickel', href: 'breadcrumb/#pumpernickel' },
        { label: 'Cornbread', href: 'breadcrumb/#cornbread' },
        { label: 'Indian Bread', href: 'breadcrumb/#indian-bread' },
        { label: 'Tortilla', href: 'breadcrumb/#tortilla' },
    ];
}
