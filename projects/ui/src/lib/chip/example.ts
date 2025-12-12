import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIChip } from './chip';
import { IconAdd } from '../icons/add';
import { IconIcecream } from '../icons/icecream';

@Component({
    selector: 'ui-chip-example',
    standalone: true,
    imports: [CommonModule, UIChip],
    template: `
        <h2>Chip</h2>

        <h3>Default with label and click</h3>
        <ui-chip label="Hello I'm Chip" (click)="handleClick()" />

        <h3>flat = true</h3>
        <ui-chip [flat]="true" label="Hello I'm Chip" (click)="handleClick()" />

        <h3>Leading Icon</h3>
        <ui-chip label="Hello I'm Chip" [leadingIcon]="iconAdd" (click)="handleClick()" />

        <h3>Trailing Icon</h3>
        <ui-chip label="Hello I'm Chip" [trailingIcon]="iconIcecream" (click)="handleClick()" />

        <h3>Both Icons</h3>
        <ui-chip label="Hello I'm Chip" [leadingIcon]="iconAdd" [trailingIcon]="iconAdd" (click)="handleClick()" />

        <h3>Badge</h3>
        <ui-chip label="Hello I'm Chip" [trailingBadge]="{ count: 3 }" (click)="handleClick()" />

        <h3>Badge & Trailing Icon</h3>
        <p>When both are provided the icon will be visible. You cannot have both trailing items.</p>
        <ui-chip
            label="Hello I'm Chip"
            [trailingBadge]="{ count: 3 }"
            [trailingIcon]="iconAdd"
            (click)="handleClick()" />

        <h3>Disabled = true</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <ui-chip [disabled]="true" label="Hello I'm Chip" />
            <ui-chip [flat]="true" [disabled]="true" label="Hello I'm Chip" />
            <ui-chip
                [disabled]="true"
                label="Hello I'm Chip"
                [leadingIcon]="iconAdd"
                [trailingIcon]="iconAdd"
                (click)="handleClick()" />
            <ui-chip [disabled]="true" label="Hello I'm Chip" [trailingBadge]="{ count: 3 }" (click)="handleClick()" />
        </div>

        <h3>Selected = true</h3>
        <ui-chip [selected]="true" label="Hello I'm Chip" (click)="handleClick()" />
    `,
})
export class UIChipExample {
    protected readonly iconAdd = IconAdd;
    protected readonly iconIcecream = IconIcecream;

    protected handleClick(): void {
        console.log('Chip clicked');
    }
}
