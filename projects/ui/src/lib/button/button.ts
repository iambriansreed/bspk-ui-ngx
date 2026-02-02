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

import { AsSignal, ButtonSize, CommonProps } from '../../types/common';
import { UIIcon } from '../icon';
import { UITooltipDirective } from '../tooltip';

export type ButtonWidth = 'fill' | 'hug';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ButtonProps = CommonProps<
    'ariaControls' | 'ariaExpanded' | 'ariaHaspopup' | 'ariaLabel' | 'class' | 'disabled' | 'owner' | 'style'
> & {
    type?: 'button' | 'reset' | 'submit';
    /**
     * The label of the button.
     *
     * @required
     */
    label: string;
    /**
     * The icon of the button.
     *
     * @type BspkIcon
     */
    icon?: BspkIcon;
    /**
     * When true the button label is hidden and only the icon is shown. When label isn't showing it is used in a tooltip
     * and as the aria-label prop.
     *
     * Ignored if `icon` is not provided.
     *
     * @default false
     */
    iconOnly?: boolean;
    /**
     * The function of the button is destructive.
     *
     * @default false
     */
    destructive?: boolean;
    /**
     * The size of the button.
     *
     * @default medium
     */
    size?: ButtonSize;
    /**
     * The color variant of the button.
     *
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * Determines how the button uses horizontal space.
     *
     * If set to 'fill', options expand to fill the container's width.
     *
     * If set to 'hug', options only take up as much space as the content requires.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
    /** The tool tip text that appears when hovered. */
    tooltip?: string;
};

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
        (mouseenter)="handleMouseEnter($event)"
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
export class UIButton implements AsSignal<ButtonProps> {
    /** Event emitted when the button is clicked. */
    @Output() onClick = new EventEmitter<MouseEvent>();

    /** Event emitted when the button receives focus. */
    @Output() onFocus = new EventEmitter<FocusEvent>();

    /** Event emitted when the button loses focus. */
    @Output() onBlur = new EventEmitter<FocusEvent>();

    /** Event emitted when mouse enters the button. */
    @Output() onMouseEnter = new EventEmitter<MouseEvent>();

    /** Event emitted when mouse leaves the button. */
    @Output() onMouseLeave = new EventEmitter<MouseEvent>();

    readonly buttonElement = viewChild.required<ElementRef<HTMLButtonElement>>('buttonElement');

    readonly style = input<ButtonProps['style']>();
    readonly label = input.required<ButtonProps['label']>();
    readonly ariaLabel = input<ButtonProps['ariaLabel']>();
    readonly ariaHaspopup = input<ButtonProps['ariaHaspopup']>();
    readonly ariaExpanded = input<ButtonProps['ariaExpanded']>();
    readonly ariaControls = input<ButtonProps['ariaControls']>();
    readonly icon = input<ButtonProps['icon']>();
    readonly iconOnly = input<ButtonProps['iconOnly']>(false);
    readonly destructive = input<ButtonProps['destructive']>(false);
    readonly size = input<ButtonProps['size']>('medium');
    readonly variant = input<ButtonProps['variant']>('primary');
    readonly width = input<ButtonProps['width']>('hug');
    readonly tooltip = input<ButtonProps['tooltip']>();
    readonly disabled = input<ButtonProps['disabled']>(false);
    readonly type = input<ButtonProps['type']>('button');
    readonly owner = input<ButtonProps['owner']>();
    readonly class = input<ButtonProps['class']>();

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

    handleMouseEnter(event: MouseEvent): void {
        if (!this.disabled()) {
            this.onMouseEnter.emit(event);
        }
    }

    handleMouseLeave(event: MouseEvent): void {
        if (!this.disabled()) {
            this.onMouseLeave.emit(event);
        }
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
