import { DOCUMENT } from '@angular/common';
import { ElementRef, OnChanges, OnDestroy, input, signal, inject, Directive } from '@angular/core';
import { AsSignal } from '../../types/common';

/** Safely focus an element if it exists and has a focus method. */
function safeFocus(el: HTMLElement | null | undefined) {
    if (el && 'focus' in el && typeof el.focus === 'function') el.focus();
}

export interface FocusTrapProps {
    /**
     * Auto-focus first focusable child on enable.
     *
     * @default true
     */
    autoFocus?: boolean;
    /**
     * Restore focus to previously focused element on disable/destroy.
     *
     * @default true
     */
    restoreFocus?: boolean;
    /** Enable or disable the focus trap. */
    'ui-focus-trap'?: boolean;
}

/**
 * Utility that traps keyboard focus within its projected content when enabled.
 *
 * @example
 *     <ui-focus-trap>
 *     <!-- interactive content -->
 *     <button>One</button>
 *     <button>Two</button>
 *     </ui-focus-trap>
 *
 * @name FocusTrap
 * @phase Utility
 */
@Directive({
    selector: '[ui-focus-trap]',
    standalone: true,
})
export class UIFocusTrapDirective implements OnChanges, OnDestroy, AsSignal<FocusTrapProps> {
    readonly enabled = input<FocusTrapProps['ui-focus-trap']>(true, {
        alias: 'ui-focus-trap',
    });
    readonly autoFocus = input<FocusTrapProps['autoFocus']>(true);
    readonly restoreFocus = input<FocusTrapProps['restoreFocus']>(true);

    readonly container = inject<ElementRef<HTMLElement>>(ElementRef);
    readonly document = inject(DOCUMENT);

    private readonly bound = signal(false);
    private readonly prevFocused = signal<HTMLElement | null>(null);

    ngOnChanges() {
        const active = this.enabled();
        if (active && !this.bound()) {
            this.attach();
            if (this.autoFocus()) queueMicrotask(() => this.focusInitial());
        } else if (!active && this.bound()) {
            this.detach();
            this.restorePreviousFocus();
        }
    }

    ngOnDestroy() {
        this.detach();
        this.restorePreviousFocus();
    }

    private attach() {
        this.prevFocused.set(this.document?.activeElement as HTMLElement | null);
        this.document?.addEventListener('keydown', this.onKeyDown, true);
        this.document?.addEventListener('focusin', this.onFocusIn, true);
        this.bound.set(true);
    }

    private detach() {
        this.document?.removeEventListener('keydown', this.onKeyDown, true);
        this.document?.removeEventListener('focusin', this.onFocusIn, true);
        this.bound.set(false);
    }

    private restorePreviousFocus() {
        if (!this.restoreFocus()) return;
        safeFocus(this.prevFocused());
        this.prevFocused.set(null);
    }

    private onKeyDown = (e: Event) => {
        if (!(e instanceof KeyboardEvent)) return;
        if (!this.enabled()) return;
        const root = this.container.nativeElement;
        if (!root) return;
        if (e.key === 'Tab') {
            const focusables = this.getFocusableElements();
            if (focusables.length === 0) {
                e.preventDefault();
                root.focus();
                return;
            }
            const active = this.document?.activeElement as HTMLElement | null;
            let index = focusables.findIndex((el) => el === active);
            if (index === -1) index = e.shiftKey ? focusables.length - 1 : 0;
            const nextIndex = e.shiftKey
                ? (index - 1 + focusables.length) % focusables.length
                : (index + 1) % focusables.length;
            e.preventDefault();

            safeFocus(focusables[nextIndex]);
        }
    };

    private onFocusIn = (e: Event) => {
        if (!this.enabled()) return;
        const target = e.target as HTMLElement | null;
        const root = this.container.nativeElement;
        if (!root || !target) return;
        if (!root.contains(target)) {
            const focusables = this.getFocusableElements();
            safeFocus(focusables[0] || root);
        }
    };

    private focusInitial() {
        const root = this.container.nativeElement;
        const focusables = this.getFocusableElements();
        safeFocus(focusables[0] || root);
    }

    private getFocusableElements(): HTMLElement[] {
        const root = this.container.nativeElement;
        if (!root) return [];
        const selector = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(',');
        const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
        return nodes.filter((el) => this.isFocusable(el));
    }

    private isFocusable(el: HTMLElement): boolean {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const notHidden = style.visibility !== 'hidden' && style.display !== 'none';
        const inDoc = !!el.ownerDocument && !!el.ownerDocument.documentElement.contains(el);
        const enabled = !(el as HTMLButtonElement).disabled;
        const inBounds = rect.width > 0 && rect.height > 0;
        return notHidden && inDoc && enabled && inBounds;
    }
}
