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
import { UIFocusTrapDirective } from '../focus-trap';
import { UIPortalDirective } from '../portal';
import { UIScrim } from '../scrim/scrim';

export type Placement = 'bottom' | 'center' | 'left' | 'right' | 'top';

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
    styleUrl: './dialog.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UIDialog implements OnChanges, OnDestroy {
    /** Function to call when the dialog is closed. */
    @Output() onClose = new EventEmitter<void>();

    readonly box = viewChild('box', { read: ElementRef });

    /** A ref to the dialog element. */
    readonly innerRef = input<(el: HTMLDivElement | null) => void>();

    /** If the dialog should appear. */
    readonly open = input<boolean>(false);

    /** The placement of the dialog on the screen. */
    readonly placement = input<Placement>('center');

    /** Whether the dialog should have a scrim behind it. */
    readonly showScrim = input<boolean>(true);

    /** If the dialog should take the full width of the screen. */
    readonly widthFull = input<boolean>(false);

    /** Owner tag for theming/analytics parity. */
    readonly owner = input<string | undefined>(undefined);

    /** Element id. */
    readonly id = input<string | undefined>(undefined);

    /** Portal container element to contain dialog within. */
    readonly container = input<HTMLElement | undefined>(undefined);

    /** Disable focus trap (not implemented here; Angular users can manage focus as needed). */
    readonly disableFocusTrap = input<boolean>(false);

    /** Accessible label for the dialog container. */
    readonly ariaLabel = input<string | undefined>(undefined);

    /** Accessible description for the dialog container. */
    readonly ariaDescription = input<string | undefined>(undefined);

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
