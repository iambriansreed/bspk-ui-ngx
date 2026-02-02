import { CommonModule } from '@angular/common';
import { Component, input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { AsSignal, CommonProps } from '../../types/common';
import { UIIcon } from '../icon';
import { UITooltipDirective } from '../tooltip';

export type FabSize = 'medium' | 'small';
export type FabVariant = 'neutral' | 'primary' | 'secondary';
export type FabPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type FabContainer = 'local' | 'page';

export type FabIconType = BspkIcon;

export type FabProps = CommonProps<'ariaLabel' | 'owner' | 'style'> & {
    /** The label of the button. */
    label?: string;
    /**
     * The icon of the button.
     *
     * @type BspkIcon
     */
    icon?: FabIconType;
    /**
     * The size of the button.
     *
     * @default small
     */
    size?: FabSize;
    /**
     * The style variant of the button.
     *
     * @default primary
     */
    variant?: FabVariant;
    /**
     * The placement of the button on the container.
     *
     * @default bottom-right
     */
    placement?: FabPlacement;
    /**
     * The container to render the button in.
     *
     * @default local
     */
    container?: FabContainer;
    /**
     * When true the button label is hidden and only the icon is shown. When label isn't showing it is used in a tooltip
     * and as the aria-label prop.
     *
     * Ignored if `icon` is not provided.
     *
     * @default false
     */
    iconOnly?: boolean;
    /** The tool tip text that appears when hovered. */
    tooltip?: string;
};

/**
 * A button that highlights a primary action that is elevated above the body content of a page; normally fixed to the
 * bottom right of a screen.
 *
 * @example
 *     ```html
 *     <ui-fab
 *         label="Floating Action Button"
 *         [icon]="iconCloud"
 *         (onClick)="handleClick()" />
 *     ```;
 *
 * @name Fab
 * @phase Dev
 */
@Component({
    selector: 'ui-fab',
    template: `
        <button
            [ui-tooltip]="tooltipLabel"
            type="button"
            [attr.aria-label]="ariaLabel() || label()"
            data-bspk="fab"
            [attr.data-container]="container()"
            [attr.data-placement]="placement()"
            [attr.data-position]="container() === 'page' ? 'fixed' : 'absolute'"
            [attr.data-round]="iconOnly() ? true : null"
            [attr.data-size]="size()"
            [attr.data-variant]="variant()"
            (click)="handleClick($event)"
            (focus)="handleFocus($event)"
            (blur)="handleBlur($event)"
            (mouseenter)="handleMouseEnter($event)"
            (mouseleave)="handleMouseLeave($event)">
            @if (!label()) {
                <ng-content></ng-content>
            } @else {
                @if (icon()) {
                    <span [attr.aria-hidden]="true" [attr.data-fab-icon]="true">
                        <ui-icon [icon]="icon()!"></ui-icon>
                    </span>
                }
                @if (shouldShowLabel) {
                    <span [attr.data-button-label]="true">{{ label() }}</span>
                }
            }
            <span [attr.data-touch-target]="true"></span>
        </button>
    `,
    styleUrl: './fab.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule, UIIcon, UITooltipDirective],
    host: {
        style: 'display: contents;',
    },
})
export class UIFab implements AsSignal<FabProps> {
    @Output() onClick = new EventEmitter<Event>();

    /** Event emitted when the button receives focus. */
    @Output() onFocus = new EventEmitter<FocusEvent>();

    /** Event emitted when the button loses focus. */
    @Output() onBlur = new EventEmitter<FocusEvent>();

    /** Event emitted when mouse enters the button. */
    @Output() onMouseEnter = new EventEmitter<MouseEvent>();

    /** Event emitted when mouse leaves the button. */
    @Output() onMouseLeave = new EventEmitter<MouseEvent>();

    readonly ariaLabel = input<FabProps['ariaLabel']>();
    readonly label = input<FabProps['label']>('');
    readonly icon = input<FabProps['icon']>();
    readonly tooltip = input<FabProps['tooltip']>();
    readonly size = input<FabProps['size']>('small');
    readonly variant = input<FabProps['variant']>('primary');
    readonly placement = input<FabProps['placement']>('bottom-right');
    readonly container = input<FabProps['container']>('local');
    readonly iconOnly = input<FabProps['iconOnly']>(false);

    get tooltipLabel(): string | undefined {
        return this.tooltip() || (this.iconOnly() ? this.label() : undefined);
    }

    get shouldShowLabel(): boolean {
        return !this.iconOnly();
    }

    isIconTemplate() {
        return typeof this.icon() !== 'string';
    }

    handleClick(event: MouseEvent): void {
        this.onClick.emit(event);
    }

    handleFocus(event: FocusEvent): void {
        this.onFocus.emit(event);
    }

    handleBlur(event: FocusEvent): void {
        this.onBlur.emit(event);
    }

    handleMouseEnter(event: MouseEvent): void {
        this.onMouseEnter.emit(event);
    }

    handleMouseLeave(event: MouseEvent): void {
        this.onMouseLeave.emit(event);
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
