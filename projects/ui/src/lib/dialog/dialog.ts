import {
    Component,
    ElementRef,
    EventEmitter,
    Output,
    ViewEncapsulation,
    input,
    signal,
    OnChanges,
    OnDestroy,
    viewChild,
} from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';
import { UIFocusTrapDirective } from '../focus-trap';
import { PortalProps, UIPortalDirective } from '../portal';
import { UIScrim } from '../scrim/scrim';

export type Placement = 'bottom' | 'center' | 'left' | 'right' | 'top';

export type DialogProps = CommonProps<'ariaDescription' | 'ariaLabel' | 'id' | 'owner'> &
    Pick<PortalProps, 'container'> & {
        /**
         * If the dialog should appear.
         *
         * @default false
         */
        open?: boolean;
        /**
         * The placement of the dialog on the screen.
         *
         * @default center
         */
        placement?: 'bottom' | 'center' | 'left' | 'right' | 'top';
        /**
         * Whether the dialog should have a scrim behind it.
         *
         * @default true
         */
        showScrim?: boolean;
        /**
         * If the dialog should take the full width of the screen.
         *
         * @default false
         */

        widthFull?: boolean;
        /**
         * If focus trapping should be disabled. Generally this should not be disabled as dialogs should always trap
         * focus.
         *
         * @default false
         */
        disableFocusTrap?: boolean;
    };

/**
 * Dialogs display important information that users need to acknowledge. They appear over the interface and may block
 * further interactions until an action is selected.
 *
 * The Modal component is a higher-level component built on top of Dialog that includes standard dialog UI and behavior.
 *
 * Also known as: Tray, Drawer, Flyout, Sheet
 *
 * @example
 *     <ui-dialog [open]="open" (onClose)="open=false">
 *     <div style="padding: var(--spacing-sizing-04)">
 *     <h4>Dialog Title</h4>
 *     <p>This is the content of the dialog.</p>
 *     </div>
 *     </ui-dialog>
 *
 * @name Dialog
 * @phase Dev
 */
@Component({
    selector: 'ui-dialog',
    standalone: true,
    imports: [UIPortalDirective, UIScrim, UIFocusTrapDirective],
    template: `
        @if (open()) {
            <div
                [ui-portal]="container()"
                [attr.data-bspk]="'dialog'"
                [attr.data-bspk-owner]="owner() || null"
                [attr.data-contained]="container() ? true : null"
                [attr.data-placement]="placement()"
                [attr.id]="id() || null"
                [attr.aria-label]="ariaLabel() || null"
                [attr.aria-description]="ariaDescription() || null"
                role="presentation">
                <div
                    data-dialog-box
                    [ui-focus-trap]="!disableFocusTrap()"
                    [attr.data-width-full]="widthFull()"
                    #box
                    tabindex="-1">
                    <ng-content></ng-content>
                </div>
            </div>
            <ui-scrim
                [ui-portal]="container()"
                [contained]="container() ? true : undefined"
                owner="dialog"
                [visible]="showScrim() !== false"
                (click)="handleClose()" />
        }
    `,
    styleUrls: ['./dialog.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UIDialog implements OnChanges, OnDestroy, AsSignal<DialogProps> {
    @Output() onClose = new EventEmitter<void>();

    readonly box = viewChild('box', { read: ElementRef });

    readonly open = input<DialogProps['open']>(false);
    readonly placement = input<DialogProps['placement']>('center');
    readonly showScrim = input<DialogProps['showScrim']>(true);
    readonly widthFull = input<DialogProps['widthFull']>(false);
    readonly owner = input<DialogProps['owner']>(undefined);
    readonly id = input<DialogProps['id']>(undefined);
    readonly container = input<DialogProps['container']>(undefined);
    readonly disableFocusTrap = input<DialogProps['disableFocusTrap']>(false);
    readonly ariaLabel = input<DialogProps['ariaLabel']>(undefined);
    readonly ariaDescription = input<DialogProps['ariaDescription']>(undefined);

    private readonly keydownBound = signal(false);

    ngOnChanges() {
        const isOpen = this.open();
        // Lock page scroll when open (like React)
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';
        if (isOpen && !this.keydownBound()) {
            window.addEventListener('keydown', this._onKeydown);
            this.keydownBound.set(true);
        } else if (!isOpen && this.keydownBound()) {
            window.removeEventListener('keydown', this._onKeydown);
            this.keydownBound.set(false);
        }
    }

    ngOnDestroy() {
        document.documentElement.style.overflow = '';
        if (this.keydownBound()) {
            window.removeEventListener('keydown', this._onKeydown);
            this.keydownBound.set(false);
        }
    }

    handleClose() {
        this.onClose.emit();
    }

    private _onKeydown = (e: KeyboardEvent) => {
        if (this.open() && e.key === 'Escape') {
            this.handleClose();
        }
    };
}
