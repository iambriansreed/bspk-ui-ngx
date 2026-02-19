import { Directive, ElementRef, OnDestroy, AfterViewInit, Renderer2, inject } from '@angular/core';

/**
 * Sets the host element's height to match its parent element's clientHeight. Updates on window resize and orientation
 * changes.
 *
 * ```html
 * <div style="height: 400px; background: rgba(255, 0, 0, 0.25); padding: 0 16px">
 *     <div ui-match-parent-height style="background: rgba(0, 0, 255, 0.25)">Content fits parent height</div>
 * </div>
 * ```
 *
 * @name MatchParentHeight
 * @phase Utility
 */
@Directive({
    selector: '[ui-match-parent-height]',
    standalone: true,
})
export class UIMatchParentHeightDirective implements AfterViewInit, OnDestroy {
    el = inject<ElementRef<HTMLElement>>(ElementRef);
    renderer = inject(Renderer2);

    private removeResize?: () => void;
    private removeOrientation?: () => void;

    ngAfterViewInit(): void {
        this.updateHeight();
        this.removeResize = this.renderer.listen('window', 'resize', () => this.updateHeight());
        this.removeOrientation = this.renderer.listen('window', 'orientationchange', () => this.updateHeight());
    }

    ngOnDestroy(): void {
        if (this.removeResize) this.removeResize();
        if (this.removeOrientation) this.removeOrientation();
    }

    private updateHeight(): void {
        const element = this.el.nativeElement;
        const parent = element?.parentElement;
        if (!element || !parent) return;

        // Reset height to allow shrinking or growing
        element.style.height = '';

        // Apply new height on next frame
        requestAnimationFrame(() => {
            element.style.height = `${parent.clientHeight}px`;
        });
    }
}
