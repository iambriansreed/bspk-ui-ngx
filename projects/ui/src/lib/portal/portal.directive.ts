import { DOCUMENT, Directive, ElementRef, OnDestroy, Renderer2, effect, inject, input } from '@angular/core';
import { AsSignal } from '../../types/common';

export type PortalContainer = HTMLElement | (() => HTMLElement | null | undefined) | null | undefined;

export interface PortalProps {
    /** The container to render the portal content in. */
    container?: PortalContainer;
}

/**
 * Utility directive to render an element in a different part of the DOM.
 *
 * @name Portal
 * @phase Utility
 */
@Directive({
    selector: '[ui-portal]',
    standalone: true,
})
export class UIPortalDirective implements OnDestroy, AsSignal<PortalProps> {
    /** The target element to render the portal into. Defaults to `this.document.body` in the browser. */
    readonly container = input<PortalProps['container']>(undefined, { alias: 'ui-portal' });

    host = inject<ElementRef<HTMLElement>>(ElementRef);
    renderer = inject(Renderer2);
    private document = inject(DOCUMENT);

    constructor() {
        effect(() => {
            if (
                typeof document === 'undefined' ||
                !this.host?.nativeElement ||
                !this.host.nativeElement.parentNode ||
                !this.container()
            )
                return;

            this.renderer.removeChild(this.host.nativeElement.parentNode, this.host.nativeElement);

            // Move the element to the new target

            let targetElement: HTMLElement | null | undefined;

            const target = this.container();

            if (typeof target === 'function') {
                targetElement = target();
            } else {
                targetElement = target || this.document.body;
            }

            this.renderer.appendChild(targetElement, this.host.nativeElement);
        });
    }

    ngOnDestroy() {
        if (this.host.nativeElement.parentNode && this.host.nativeElement)
            this.host.nativeElement.parentNode.removeChild(this.host.nativeElement);
    }
}
