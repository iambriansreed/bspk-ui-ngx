import { ComponentRef, Renderer2, signal } from '@angular/core';

import { addComponent } from '../../utils/add-component';
import { uniqueId } from '../../utils/random';
import { FloatingUtility } from '../floating/floating';
import { TooltipProps, TooltipPlacement, UITooltip } from './';

export type TooltipUtilityProps = TooltipProps & { reference?: HTMLElement };

/**
 * Utility to manage tooltip properties and behavior.
 *
 * Should be used in components that require tooltip functionality.
 */
export class TooltipUtility {
    readonly props = signal<TooltipUtilityProps>({});

    readonly tooltipId = uniqueId('tooltip');

    private floating: FloatingUtility | undefined;
    private readonly computedPlacement = signal<TooltipPlacement | null>(null);
    private tooltipComponent?: ComponentRef<UITooltip> | null;

    constructor(
        private renderer: Renderer2,
        private env: any,
        props: Partial<TooltipUtilityProps>,
    ) {
        this.updateProps(props);

        const host = props.reference;

        this.floating = new FloatingUtility(this.renderer);

        if (typeof document === 'undefined' || !host) return;

        host.addEventListener('mouseenter', this.handleOpenEvent.bind(this));
        host.addEventListener('mouseleave', this.handleCloseEvent.bind(this));
        host.addEventListener('focusin', this.handleOpenEvent.bind(this));
        host.addEventListener('blur', this.handleCloseEvent.bind(this));

        if (!this.referenceEl || !this.props().label) return;

        this.renderer.setAttribute(this.referenceEl, 'aria-labelledby', this.tooltipId);

        this.addComponent(this.props());
    }

    get referenceEl() {
        return this.props().reference || null;
    }

    get tooltipEl() {
        return this.tooltipComponent?.location.nativeElement as HTMLElement;
    }

    get arrowEl() {
        return this.tooltipComponent?.instance.arrowElement as HTMLElement;
    }

    updateProps(next: Partial<TooltipUtilityProps>) {
        const props = {
            ...this.props(),
            ...next,
        };

        this.props.set(props);

        if (this.tooltipComponent) {
            this.tooltipComponent.instance.props.set({
                ...props,

                // ensure placement is always up to date
                placement: this.computedPlacement() || props.placement,
            });
            this.tooltipComponent.changeDetectorRef.detectChanges();
        }
    }

    destroy() {
        const host = this.props().reference;

        if (typeof document === 'undefined' || !host) return;

        host.removeEventListener('mouseenter', this.handleOpenEvent.bind(this));
        host.removeEventListener('mouseleave', this.handleCloseEvent.bind(this));
        host.removeEventListener('focusin', this.handleOpenEvent.bind(this));
        host.removeEventListener('blur', this.handleCloseEvent.bind(this));
    }

    addComponent(props = this.props()): boolean {
        if (
            // if we can't render or already rendered or disabled or no label we can't show
            typeof document === 'undefined' ||
            !this.referenceEl ||
            !props.label
        ) {
            return false;
        }

        this.tooltipComponent = addComponent(this.env, UITooltip, 'ui-tooltip')!;

        if (this.tooltipEl) this.renderer.setStyle(this.tooltipEl, 'display', 'none');
        this.tooltipComponent.instance.id.set(this.tooltipId);
        this.updateProps(props);
        return true;
    }

    handleOpenEvent(event: Event) {
        const props = this.props();

        if (!props.label || event.target !== this.referenceEl || props.disabled || !this.floating) return;

        if (this.tooltipEl) this.renderer.setStyle(this.tooltipEl, 'display', 'block');

        this.floating
            .compute({
                placement: this.props()?.placement || 'top',
                reference: this.referenceEl,
                floating: this.tooltipEl,
                arrow: this.arrowEl,
                offsetOptions: this.arrowEl ? 8 : 4,
                refWidth: false,
            })
            .then(({ placement }) => {
                if (this.tooltipEl && placement !== this.props()?.placement)
                    this.computedPlacement.set(placement as TooltipPlacement);
            });
    }

    handleCloseEvent() {
        const { label } = this.props();
        if (!label) return;

        if (this.tooltipEl) this.renderer.setStyle(this.tooltipEl, 'display', 'none');
    }
}
