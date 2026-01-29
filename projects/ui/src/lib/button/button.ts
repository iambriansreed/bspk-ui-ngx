import { CommonModule } from '@angular/common';
import {
    Component,
    Output,
    EventEmitter,
    ElementRef,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    input,
    viewChild,
} from '@angular/core';

import { BspkIcon } from '../../types/bspk-icon';

import { ButtonSize } from '../../types/common';
import { UIIcon } from '../icon';
import { UITooltipDirective } from '../tooltip';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonWidth = 'fill' | 'hug';
export type IconType = BspkIcon;

/**
 * A clickable component that allows users to perform an action, make a choice or trigger a change in state.
 *
 * @example
 *     ```html
 *     <bspk-button
 *       label="Click Me"
 *       size="medium"
 *       variant="primary"
 *       (onClick)="handleClick($event)"
 *       icon="iconTemplate">
 *     </bspk-button>
 *     ```;
 *
 * @name Button
 * @phase Dev
 */
@Component({
    selector: 'ui-button',
    template: `<button
        [ui-tooltip]="tooltipLabel"
        #buttonElement
        [type]="type()"
        [attr.aria-label]="ariaLabel() || label()"
        [attr.aria-controls]="ariaControls() || null"
        [attr.aria-expanded]="ariaExpanded() || null"
        [attr.aria-haspopup]="ariaHaspopup() || null"
        [attr.data-bspk]="'button'"
        [attr.data-bspk-owner]="owner() || null"
        [attr.data-destructive]="destructive() || null"
        [attr.data-size]="size()"
        [attr.data-touch-target-parent]="true"
        [attr.data-variant]="variant()"
        [attr.data-width]="width()"
        [disabled]="disabled() || null"
        [class]="buttonClasses"
        (click)="handleClick($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
        (mouseover)="handleMouseOver($event)"
        (mouseleave)="handleMouseLeave($event)"
        [style]="style()">
        <ng-content>
            @if (icon()) {
                <span [attr.aria-hidden]="true" [attr.data-button-icon]="true">
                    <ui-icon [icon]="icon()!"></ui-icon>
                </span>
            }
            @if (shouldShowLabel) {
                <span [attr.data-button-label]="true">{{ label() }}</span>
            }
        </ng-content>
        <span [attr.data-touch-target]="true"></span>
    </button>`,
    styleUrls: ['./button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, UIIcon, UITooltipDirective],
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UIButton {
    /** Event emitted when the button is clicked. */
    @Output() onClick = new EventEmitter<MouseEvent>();

    /** Event emitted when the button receives focus. */
    @Output() onFocus = new EventEmitter<FocusEvent>();

    /** Event emitted when the button loses focus. */
    @Output() onBlur = new EventEmitter<FocusEvent>();

    /** Event emitted when mouse enters the button. */
    @Output() onMouseOver = new EventEmitter<MouseEvent>();

    /** Event emitted when mouse leaves the button. */
    @Output() onMouseLeave = new EventEmitter<MouseEvent>();

    readonly buttonElement = viewChild.required<ElementRef<HTMLButtonElement>>('buttonElement');

    readonly style = input<string>();

    /**
     * The label of the button.
     *
     * @required
     */
    readonly label = input.required<string>();

    /** Use only for custom buttons. The aria-label of the button for accessibility purposes. */
    readonly ariaLabel = input<string>();

    /** The aria-haspopup attribute of the button for accessibility purposes. */
    readonly ariaHaspopup = input<string>();

    /** The aria-expanded attribute of the button for accessibility purposes. */
    readonly ariaExpanded = input<boolean | null>(null);

    /** The aria-controls attribute of the button for accessibility purposes. */
    readonly ariaControls = input<string | null>(null);

    /**
     * The icon of the button.
     *
     * Should be a SVG from the BSPK icon library.
     */
    readonly icon = input<IconType | undefined>();

    /**
     * When true the button label is hidden and only the icon is shown. When label isn't showing it is used in a tooltip
     * and as the aria-label prop.
     *
     * Ignored if `icon` is not provided.
     *
     * @default false
     */
    readonly iconOnly = input(false);

    /**
     * The function of the button is destructive.
     *
     * @default false
     */
    readonly destructive = input(false);

    /**
     * The size of the button.
     *
     * @default medium
     */
    readonly size = input<ButtonSize>('medium');

    /**
     * The color variant of the button.
     *
     * @default primary
     */
    readonly variant = input<ButtonVariant>('primary');

    /**
     * The width of the button.
     *
     * @default hug
     */
    readonly width = input<ButtonWidth>('hug');

    /** The tool tip text that appears when hovered. */
    readonly tooltip = input<string>();

    /**
     * Whether the button is disabled.
     *
     * @default false
     */
    readonly disabled = input(false);

    /**
     * The button type attribute.
     *
     * @default button
     */
    readonly type = input<'button' | 'reset' | 'submit'>('button');

    /** Owner identifier for tracking/analytics. */
    readonly owner = input<string>();

    /** Additional CSS classes to apply. */
    readonly class = input<string>();
    /** Custom content template to override default button content. Not recommended - use for special cases only. */

    get nativeElement(): HTMLButtonElement {
        return this.buttonElement().nativeElement!;
    }

    get shouldShowLabel(): boolean {
        return !this.iconOnly();
    }

    get tooltipLabel(): string | undefined {
        return this.tooltip() || (this.iconOnly() ? this.label() : undefined);
    }

    get buttonClasses(): string {
        const classes: string[] = [];

        if (this.class()) {
            classes.push(this.class()!);
        }

        return classes.join(' ');
    }

    handleClick(event: MouseEvent): void {
        if (!this.disabled()) {
            this.onClick.emit(event);
        }
    }

    handleFocus(event: FocusEvent): void {
        if (!this.disabled()) {
            this.onFocus.emit(event);
        }
    }

    handleBlur(event: FocusEvent): void {
        if (!this.disabled()) {
            this.onBlur.emit(event);
        }
    }

    handleMouseOver(event: MouseEvent): void {
        if (!this.disabled()) {
            this.onMouseOver.emit(event);
        }
    }

    handleMouseLeave(event: MouseEvent): void {
        if (!this.disabled()) {
            this.onMouseLeave.emit(event);
        }
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
