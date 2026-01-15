import { Directive, inject, input, Renderer2, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { FloatingUtility, FloatingProps } from './floating';

export type FloatingDirectiveProps = Omit<FloatingProps, 'floating'>;

/**
 * A directive to position an element relative to a reference element using floating UI logic.
 *
 * @name UIFloatingDirective
 * @phase Utility
 */
@Directive({
    selector: '[ui-floating]',
    host: {
        style: 'position: absolute;',
    },
})
export class UIFloatingDirective implements AfterViewInit, OnDestroy {
    render = inject(Renderer2);
    host = inject(ElementRef);

    floating = new FloatingUtility(this.render);

    readonly props = input.required<FloatingDirectiveProps>({ alias: 'ui-floating' });

    ngAfterViewInit(): void {
        const nextProps: FloatingProps = {
            ...this.props(),
            floating: this.host.nativeElement,
        };

        this.floating.compute(nextProps);
        window.addEventListener('scroll', this.updateFloatingPosition, true);
        window.addEventListener('resize', this.updateFloatingPosition, true);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.updateFloatingPosition, true);
        window.removeEventListener('resize', this.updateFloatingPosition, true);
    }

    updateFloatingPosition = () => {
        const nextProps: FloatingProps = {
            ...this.props(),
            floating: this.host.nativeElement,
        };
        this.floating.compute(nextProps);
    };
}
