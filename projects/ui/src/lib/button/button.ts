import {
    Component,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    ViewChild,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Icon } from '../icon';
import { TooltipDirective } from '../tooltip';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'large' | 'medium' | 'small' | 'x-small';
export type ButtonWidth = 'fill' | 'hug';

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
 * @phase UXReview
 */
@Component({
    selector: 'ui-button',
    templateUrl: './button.html',
    styleUrls: ['./button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, Icon, TooltipDirective],
    encapsulation: ViewEncapsulation.None,
})
export class Button implements OnInit {
    @ViewChild('buttonElement', { static: true }) buttonElement!: ElementRef<HTMLButtonElement>;

    /**
     * The label of the button.
     *
     * @required
     */
    @Input() label!: string;

    /**
     * The icon of the button.
     *
     * Should be a SVG from the BSPK icon library.
     */
    @Input() icon?: string;

    /**
     * When true the button label is hidden and only the icon is shown. When label isn't showing it is used in a tooltip
     * and as the aria-label prop.
     *
     * Ignored if `icon` is not provided.
     *
     * @default false
     */
    @Input() iconOnly: boolean = false;

    /**
     * The function of the button is destructive.
     *
     * @default false
     */
    @Input() destructive: boolean = false;

    /**
     * The size of the button.
     *
     * @default medium
     */
    @Input() size: ButtonSize = 'medium';

    /**
     * The color variant of the button.
     *
     * @default primary
     */
    @Input() variant: ButtonVariant = 'primary';

    /**
     * The width of the button.
     *
     * @default hug
     */
    @Input() width: ButtonWidth = 'hug';

    /** The tool tip text that appears when hovered. */
    @Input() toolTip?: string;

    /**
     * Whether the button is disabled.
     *
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * The button type attribute.
     *
     * @default button
     */
    @Input() type: 'button' | 'reset' | 'submit' = 'button';

    /** Owner identifier for tracking/analytics. */
    @Input() owner?: string;

    /** Additional CSS classes to apply. */
    @Input() class?: string;
    /** Custom content template to override default button content. Not recommended - use for special cases only. */
    @Input() customContent?: TemplateRef<any>;

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

    get shouldShowLabel(): boolean {
        return !this.iconOnly;
    }

    get tooltipLabel(): string | undefined {
        return this.toolTip || (this.iconOnly ? this.label : undefined);
    }

    get buttonClasses(): string {
        const classes: string[] = [];

        if (this.class) {
            classes.push(this.class);
        }

        return classes.join(' ');
    }

    ngOnInit(): void {
        // Validate required inputs
        if (!this.label) {
            console.warn('Button component requires a label prop');
        }
    }

    handleClick(event: MouseEvent): void {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
    }

    handleFocus(event: FocusEvent): void {
        if (!this.disabled) {
            this.onFocus.emit(event);
        }
    }

    handleBlur(event: FocusEvent): void {
        if (!this.disabled) {
            this.onBlur.emit(event);
        }
    }

    handleMouseOver(event: MouseEvent): void {
        if (!this.disabled) {
            this.onMouseOver.emit(event);
        }
    }

    handleMouseLeave(event: MouseEvent): void {
        if (!this.disabled) {
            this.onMouseLeave.emit(event);
        }
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
