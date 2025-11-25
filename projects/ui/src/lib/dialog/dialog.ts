import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    Renderer2,
    ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { FocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';

@Component({
    selector: 'ui-dialog',
    standalone: true,
    imports: [CommonModule, PortalModule],
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UIDialog implements OnChanges, OnDestroy {
    /**
     * If the dialog should appear.
     *
     * @default false
     */
    @Input() open = false;
    /**
     * The placement of the dialog on the screen.
     *
     * @default center
     */
    @Input() placement: 'bottom' | 'center' | 'left' | 'right' | 'top' = 'center';
    /**
     * Whether the dialog should have a scrim behind it.
     *
     * @default true
     */
    @Input() showScrim = true;
    /**
     * If the dialog should take the full width of the screen.
     *
     * @default false
     */

    @Input() widthFull = false;
    /**
     * If focus trapping should be disabled. Generally this should not be disabled as dialogs should always trap focus.
     *
     * @default false
     */
    @Input() disableFocusTrap = false;
    /**
     * Function to call when the dialog is closed.
     *
     * @type () => void
     * @required
     */
    @Output() onClose = new EventEmitter<void>();

    @ViewChild('dialogTemplate', { static: true }) dialogTemplate!: TemplateRef<any>;

    private overlayRef?: OverlayRef;
    private portal?: TemplatePortal<any>;
    private focusTrap?: FocusTrap;

    constructor(
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private renderer: Renderer2,
        private focusTrapFactory: FocusTrapFactory,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['open']) {
            if (this.open) this.openOverlay();
            else this.closeOverlay();
        }
    }

    private openOverlay() {
        if (this.overlayRef) return;

        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
        });

        this.portal = new TemplatePortal(this.dialogTemplate, this.vcr);
        this.overlayRef.attach(this.portal);

        const pane = this.overlayRef.overlayElement;
        if (pane) {
            pane.setAttribute('data-bspk', 'dialog');
            pane.setAttribute('data-placement', this.placement);
            pane.setAttribute('role', 'presentation');
        }

        const backdrop = (this.overlayRef as any).backdropElement as HTMLElement | null;
        if (backdrop) backdrop.setAttribute('data-bspk-overlay-backdrop', '');

        this.overlayRef.backdropClick().subscribe(() => this.emitClose());
        this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
            if (event.key === 'Escape') this.emitClose();
        });

        // create focus trap after attach
        setTimeout(() => {
            if (!this.overlayRef) return;
            const dialogBox = this.overlayRef.overlayElement.querySelector<HTMLElement>('[data-dialog-box]');
            if (dialogBox) {
                if (!this.disableFocusTrap) {
                    this.focusTrap = this.focusTrapFactory.create(dialogBox);
                    try {
                        this.focusTrap.focusInitialElementWhenReady();
                    } catch {
                        // fallback: focus the dialog box
                        dialogBox.focus();
                    }
                }

                if (this.widthFull) dialogBox.setAttribute('data-width-full', 'true');
            }
        });
    }

    private closeOverlay() {
        if (!this.overlayRef) return;
        if (this.focusTrap) {
            this.focusTrap.destroy();
            this.focusTrap = undefined;
        }
        this.overlayRef.dispose();
        this.overlayRef = undefined;
        this.portal = undefined;
    }

    public emitClose() {
        this.onClose.emit();
        this.closeOverlay();
    }

    ngOnDestroy() {
        this.closeOverlay();
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
