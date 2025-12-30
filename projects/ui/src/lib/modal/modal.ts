import { Component, EventEmitter, Output, ViewEncapsulation, input, computed, inject } from '@angular/core';
import { ButtonSize } from '../../types/common';
import { UIBreakpointService } from '../../utils/breakpoint.service';
import { UIButton, ButtonWidth } from '../button/button';
import { UIDialog } from '../dialog/dialog';
import { IconClose } from '../icons/close';
import { UIMatchParentHeightDirective } from '../match-parent-height';

export interface ModalCallToAction {
    label: string;
    onClick: () => void;
    destructive?: boolean;
}

export type ButtonFormat = 'horizontal' | 'vertical';

/**
 * Modals display important information that users need to acknowledge. They appear over the interface and block further
 * interactions until an action is selected. Modal is a wrapper around the Dialog component that provides a header and
 * footer for the dialog.
 *
 * @example
 *     <ui-button label="Open Modal" (onClick)="open = true"></ui-button>
 *     <ui-modal
 *     description="Example description"
 *     header="Example header"
 *     (onClose)="open = false"
 *     [open]="open">
 *     Example Modal
 *     </ui-modal>
 *
 * @name Modal
 * @phase Dev
 */
@Component({
    selector: 'ui-modal',
    standalone: true,
    imports: [UIDialog, UIButton, UIMatchParentHeightDirective],
    template: `
        @if (open()) {
            <ui-dialog
                [open]="open()"
                (onClose)="onClose.emit()"
                [container]="container()"
                [disableFocusTrap]="disableFocusTrap()"
                [id]="id() || undefined"
                [owner]="owner() || undefined"
                [ariaLabel]="header()"
                [ariaDescription]="description()"
                placement="center"
                [showScrim]="true">
                <div data-bspk="modal" #innerRef ui-match-parent-height>
                    <div data-modal-header>
                        <div data-modal-title>{{ header() }}</div>
                        <ui-button
                            label="close"
                            variant="tertiary"
                            [size]="buttonSize()"
                            (onClick)="onClose.emit()"
                            [icon]="iconClose"
                            [iconOnly]="true"></ui-button>
                    </div>
                    <div data-modal-main>
                        <ng-content></ng-content>
                    </div>
                    @if (hasFooterButtons()) {
                        <div data-modal-footer [attr.data-button-format]="buttonFormat()">
                            @if (callToAction()) {
                                <ui-button
                                    [label]="callToAction()!.label"
                                    [variant]="'primary'"
                                    [size]="buttonSize()"
                                    [width]="buttonWidth()"
                                    [destructive]="callToAction()!.destructive ?? false"
                                    (onClick)="callToAction()!.onClick()" />
                            }
                            @if (callToAction() && cancelButton()) {
                                <ui-button
                                    [label]="cancelLabel()"
                                    [variant]="'tertiary'"
                                    [size]="buttonSize()"
                                    [width]="buttonWidth()"
                                    (onClick)="onClose.emit()" />
                            }
                        </div>
                    }
                </div>
            </ui-dialog>
        }
    `,
    styleUrl: './modal.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIModal {
    /** Emits when modal requests to close. */
    @Output() onClose = new EventEmitter<void>();

    iconClose = IconClose;

    /** Modal header. */
    readonly header = input.required<string>();

    /** Modal description. Used for the aria-description attribute. */
    readonly description = input.required<string>();

    /** A ref to the modal element. */
    readonly innerRef = input<(el: HTMLDivElement | null) => void>();

    /** Whether to show the cancel button in the footer. Providing a string sets its label. */
    readonly cancelButton = input<boolean | string>(false);

    /** The call to action button to display in the footer of the modal. */
    readonly callToAction = input<ModalCallToAction | undefined>(undefined);

    /** The format of the buttons in the footer. Vertical only applies on <=640px. */
    readonly buttonFormat = input<ButtonFormat>('horizontal');

    // Dialog-proxy inputs
    readonly open = input<boolean>(false);
    readonly id = input<string | undefined>(undefined);
    readonly owner = input<string | undefined>(undefined);
    readonly container = input<HTMLElement | undefined>(undefined);
    readonly disableFocusTrap = input<boolean>(false);

    // Defaults: Angular app likely desktop; keep small; width depends on format
    readonly buttonSize = computed<ButtonSize>(() => (this.isMobile() ? 'medium' : 'small'));
    readonly buttonWidth = computed<ButtonWidth>(() => (this.buttonFormat() === 'vertical' ? 'fill' : 'hug'));

    readonly cancelLabel = computed<string>(() =>
        typeof this.cancelButton() === 'string' ? (this.cancelButton() as string) : 'Cancel',
    );

    readonly hasFooterButtons = computed<boolean>(() => !!this.callToAction());

    breakpointService = inject(UIBreakpointService);

    readonly isMobile = computed(
        () =>
            this.breakpointService.currentBreakpointSignal() === 'small' ||
            this.breakpointService.currentBreakpointSignal() === 'medium',
    );
}
