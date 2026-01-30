import { Directive, ElementRef, OnChanges, OnDestroy, SimpleChanges, input } from '@angular/core';
import { AsSignal } from '../../types/common';

export type PortalContainer = HTMLElement | (() => HTMLElement | null | undefined) | null | undefined;

export interface PortalProps {
    /** The container to render the portal content in. */
    container?: PortalContainer;
}

/** Utility directive to render an element in a different part of the DOM. */
@Directive({ selector: '[ui-portal]' })
export class UIPortalDirective implements OnDestroy, OnChanges, AsSignal<PortalProps> {
    /** The target element to render the portal into. Defaults to `document.body` in the browser. */
    readonly container = input<PortalProps['container']>(undefined, { alias: 'ui-portal' });

    constructor(private elRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['container']) {
            if (typeof document === 'undefined' || !this.elRef?.nativeElement) return;

            this.elRef.nativeElement.parentNode.removeChild(this.elRef.nativeElement);
            // Move the element to the new target

            let targetElement: HTMLElement | null | undefined;

            const target = changes['container'].currentValue;

            if (typeof target === 'function') {
                targetElement = target();
            } else {
                targetElement = target || document.body;
            }

            targetElement?.appendChild(this.elRef.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.elRef.nativeElement.parentNode) {
            this.elRef.nativeElement.parentNode.removeChild(this.elRef.nativeElement);
        }
    }
}
