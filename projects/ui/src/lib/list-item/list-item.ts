import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

/**
 * A hybrid interactive component that is used frequently to organize content and offers a wide range of control and
 * navigation in most experiences.
 *
 * With its flexible and simple structure, the list item element is core and can meet the needs of many uses cases.
 *
 * The ListItem has three main elements: leading element, label, and trailing element.
 *
 * Leading elements should be one of the following Icon, Img, Avatar.
 *
 * Trailing elements should be one of the following Icon, Checkbox, Button, Radio, Switch, Tag, Txt.
 *
 * @name ListItem
 * @phase Dev
 */
@Component({
    selector: 'ui-list-item',
    standalone: true,
    imports: [NgTemplateOutlet],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list-item.scss'],
    template: `
        <ng-template #inner>
            <ng-content select="[data-leading]"></ng-content>
            <span data-item-label>
                <span data-text>{{ label }}</span>
                @if (subText) {
                    <span data-sub-text>{{ subText }}</span>
                }
            </span>
            <ng-content select="[data-trailing]"></ng-content>
        </ng-template>
        @if (As === 'a') {
            <a
                [attr.aria-label]="ariaLabel || undefined"
                [attr.aria-selected]="ariaSelected"
                [attr.role]="role"
                [attr.tabindex]="tabIndex ?? (actionable ? 0 : -1)"
                [attr.href]="href"
                [attr.data-action]="actionable || undefined"
                [attr.data-active]="active || undefined"
                data-bspk="list-item"
                [attr.data-bspk-owner]="owner || undefined"
                [attr.data-disabled]="isDisabled || undefined"
                [attr.data-readonly]="isReadonly || undefined"
                [attr.data-width]="width === 'hug' ? 'hug' : undefined"
                [id]="id"
                (click)="onClick($event)"
                (keydown.enter)="onClick($event)">
                <ng-container *ngTemplateOutlet="inner"></ng-container>
            </a>
        } @else if (As === 'button') {
            <button
                type="button"
                [attr.aria-label]="ariaLabel || undefined"
                [attr.aria-selected]="ariaSelected"
                [attr.role]="role"
                [attr.tabindex]="tabIndex ?? (actionable ? 0 : -1)"
                [attr.data-action]="actionable || undefined"
                [attr.data-active]="active || undefined"
                data-bspk="list-item"
                [attr.data-bspk-owner]="owner || undefined"
                [attr.data-disabled]="isDisabled || undefined"
                [attr.data-readonly]="isReadonly || undefined"
                [attr.data-width]="width === 'hug' ? 'hug' : undefined"
                [id]="id"
                (click)="onClick($event)">
                <ng-container *ngTemplateOutlet="inner"></ng-container>
            </button>
        } @else if (As === 'label') {
            <label
                [attr.aria-label]="ariaLabel || undefined"
                [attr.aria-selected]="ariaSelected"
                [attr.role]="role"
                [attr.tabindex]="tabIndex ?? (actionable ? 0 : -1)"
                [attr.data-action]="actionable || undefined"
                [attr.data-active]="active || undefined"
                data-bspk="list-item"
                [attr.data-bspk-owner]="owner || undefined"
                [attr.data-disabled]="isDisabled || undefined"
                [attr.data-readonly]="isReadonly || undefined"
                [attr.data-width]="width === 'hug' ? 'hug' : undefined"
                [id]="id"
                [attr.for]="htmlFor"
                (click)="onClick($event)"
                (keydown.enter)="onClick($event)">
                <ng-container *ngTemplateOutlet="inner"></ng-container>
            </label>
        } @else {
            <div
                [attr.aria-label]="ariaLabel || undefined"
                [attr.aria-selected]="ariaSelected"
                [attr.role]="role"
                [attr.tabindex]="tabIndex ?? (actionable ? 0 : -1)"
                [attr.data-action]="actionable || undefined"
                [attr.data-active]="active || undefined"
                data-bspk="list-item"
                [attr.data-bspk-owner]="owner || undefined"
                [attr.data-disabled]="isDisabled || undefined"
                [attr.data-readonly]="isReadonly || undefined"
                [attr.data-width]="width === 'hug' ? 'hug' : undefined"
                [id]="id"
                (click)="onClick($event)"
                (keydown.enter)="onClick($event)">
                <ng-container *ngTemplateOutlet="inner"></ng-container>
            </div>
        }
    `,
    host: {
        style: 'display: contents;',
    },
})
export class UIListItem {
    /** Indicates the current active state of the item. */
    @Input() active?: boolean;
    /** Owner identifier for analytics or debugging; emitted as `data-bspk-owner`. */
    @Input() owner?: string;
    /** The ARIA label for the list item. */
    @Input() ariaLabel?: string | null;
    /** Indicates the current selected state of the list item in selectable contexts. */
    @Input() ariaSelected?: boolean | null;
    /** ARIA disabled state; when set, the item is non-interactive. */
    @Input() ariaDisabled?: boolean | null;
    /** ARIA readonly state; when set, the item does not accept interaction. */
    @Input() ariaReadonly?: boolean | null;
    /** The `for` attribute target when rendering as a label. */
    @Input() htmlFor?: string;
    /** Native disabled state; when set, the item is non-interactive. */
    @Input() disabled?: boolean;
    /** Native readonly state; when set, the item does not accept interaction. */
    @Input() readonly?: boolean;
    /**
     * The element type to render as.
     *
     * @default div
     */
    @Input() as: 'a' | 'button' | 'div' | 'label' = 'div';
    /** The href of the list item. If provided, renders as an anchor element. */
    @Input() href?: string;
    /**
     * The label to display in the ListItem.
     *
     * @required
     */
    @Input() label!: string;
    /** The subtext to display in the ListItem. */
    @Input() subText?: string;
    /**
     * Determines how the ListItem uses horizontal space. If set to 'fill', options expand to fill the container's
     * width. If set to 'hug', options only take up as much space as the content requires.
     *
     * @default fill
     */
    @Input() width?: 'fill' | 'hug';
    /** Explicit tabIndex; defaults to 0 when actionable, otherwise -1. */
    @Input() tabIndex?: number | null;

    @Output() clicked = new EventEmitter<Event>();

    id = `${Math.random().toString(36).slice(2)}`;

    get isReadonly() {
        return !!(this.readonly || this.ariaReadonly);
    }
    get isDisabled() {
        return !!(this.disabled || this.ariaDisabled);
    }
    get actionable() {
        return !!(this.href && !this.isReadonly && !this.isDisabled) || this.as === 'button';
    }

    get As() {
        if (this.as) return this.as;
        if (this.href) return 'a';
        return 'div';
    }

    get role(): string | undefined {
        if (!this.actionable) return undefined;
        if (this.as === 'button') return undefined;
        return undefined;
    }

    onClick(event: Event) {
        if (this.isReadonly || this.isDisabled) return;
        this.clicked.emit(event);
    }
}
