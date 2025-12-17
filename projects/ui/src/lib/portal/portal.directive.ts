import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

export type PortalContainer = HTMLElement | (() => HTMLElement | null | undefined) | null | undefined;

@Directive({ selector: '[ui-portal]' })
export class UIPortalDirective implements OnDestroy, OnChanges {
    /** The target element to render the portal into. Defaults to `document.body` in the browser. */
    @Input('ui-portal') container?: PortalContainer;

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
