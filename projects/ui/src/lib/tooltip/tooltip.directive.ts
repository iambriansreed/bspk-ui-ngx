import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UITooltip } from './tooltip';

export type TooltipProps = {
    /** The tooltip content. */
    label?: string;
    /**
     * The placement of the tooltip.
     *
     * @default top
     */
    placement?: 'bottom' | 'left' | 'right' | 'top';
    /**
     * Determines if the tooltip should hide the tail.
     *
     * @default true
     */
    showTail?: boolean;
    /** Determines if the tooltip is disabled. */
    disabled?: boolean;
};

@Directive({ selector: '[tooltip]' })
export class UITooltipDirective implements OnDestroy {
    /** Accepts a string (tooltip label) or a config object { label, placement, showTail, disabled } */
    @Input('tooltip') tooltip: TooltipProps | string = '';

    private overlayRef?: OverlayRef;
    private attached?: ComponentRef<UITooltip>;
    private posSub: any;

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
        // Always set display: inline-block on the host element
        this.renderer.setAttribute(this.elementRef.nativeElement, 'data-tooltip-directive', '');
    }

    ngOnDestroy(): void {
        this.posSub?.unsubscribe?.();
        this.overlayRef?.dispose();
    }

    private normalizedConfig(): Required<TooltipProps> {
        const base: TooltipProps = typeof this.tooltip === 'string' ? { label: this.tooltip } : this.tooltip || {};

        return {
            label: base.label || '',
            placement: (base.placement as any) ?? base.placement ?? 'top',
            showTail: base.showTail ?? true,
            disabled: !!base.disabled || !base.label,
        };
    }

    private createOverlayForPlacement(placement: string) {
        const positions: ConnectedPosition[] = this.positionsFor(placement);
        const positionStrategy = this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions(positions);

        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.posSub?.unsubscribe();
            this.posSub = undefined;
        }

        this.overlayRef = this.overlay.create({
            positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });

        const strat: any = positionStrategy;
        if (strat && strat.positionChanges && typeof strat.positionChanges.subscribe === 'function') {
            this.posSub = strat.positionChanges.subscribe((change: any) => {
                const pair = change.connectionPair;
                const placementResolved = this.mapPairToPlacement(pair);
                this.setAttachedAttribute('data-placement', placementResolved);
            });
        }
    }

    @HostListener('mouseenter')
    @HostListener('focus')
    show() {
        const cfg = this.normalizedConfig();
        if (cfg.disabled) return;
        this.createOverlayForPlacement(cfg.placement);
        const tooltipRef: ComponentRef<UITooltip> | undefined = this.overlayRef?.attach(new ComponentPortal(UITooltip));

        if (tooltipRef) {
            this.attached = tooltipRef;
            tooltipRef.instance.label = cfg.label;
            tooltipRef.instance.showTail = cfg.showTail;
            this.setAttachedAttribute('data-show-tail', String(cfg.showTail));
        }
    }

    @HostListener('mouseleave')
    @HostListener('blur')
    hide() {
        if (this.attached) {
            this.attached.destroy();
            this.attached = undefined;
        }
        this.overlayRef?.detach();
        this.posSub?.unsubscribe();
        this.posSub = undefined;
    }

    private setAttachedAttribute(name: string, value: string) {
        try {
            if (!this.attached) return;
            const hostEl = this.attached.location.nativeElement as HTMLElement;
            const root = hostEl.querySelector('[data-bspk="tooltip"]') as HTMLElement | null;
            const target = root || hostEl;
            target.setAttribute(name, value);
        } catch (e) {
            // ignore
        }
    }

    private positionsFor(placement: string): ConnectedPosition[] {
        const offset = 8;
        switch (placement) {
            case 'top':
                return [
                    {
                        originX: 'center',
                        originY: 'top',
                        overlayX: 'center',
                        overlayY: 'bottom',
                        offsetY: -offset,
                    },
                    {
                        originX: 'center',
                        originY: 'bottom',
                        overlayX: 'center',
                        overlayY: 'top',
                        offsetY: offset,
                    },
                ];
            case 'bottom':
                return [
                    {
                        originX: 'center',
                        originY: 'bottom',
                        overlayX: 'center',
                        overlayY: 'top',
                        offsetY: offset,
                    },
                    {
                        originX: 'center',
                        originY: 'top',
                        overlayX: 'center',
                        overlayY: 'bottom',
                        offsetY: -offset,
                    },
                ];
            case 'left':
                return [
                    {
                        originX: 'start',
                        originY: 'center',
                        overlayX: 'end',
                        overlayY: 'center',
                        offsetX: -offset,
                    },
                    {
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center',
                        offsetX: offset,
                    },
                ];
            case 'right':
            default:
                return [
                    {
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center',
                        offsetX: offset,
                    },
                    {
                        originX: 'start',
                        originY: 'center',
                        overlayX: 'end',
                        overlayY: 'center',
                        offsetX: -offset,
                    },
                ];
        }
    }

    private mapPairToPlacement(pair: any): 'bottom' | 'left' | 'right' | 'top' {
        if (!pair) return 'top';
        const { originX, originY, overlayX, overlayY } = pair;
        if (originY === 'top' && overlayY === 'bottom') return 'top';
        if (originY === 'bottom' && overlayY === 'top') return 'bottom';
        if (originX === 'start' && overlayX === 'end') return 'left';
        if (originX === 'end' && overlayX === 'start') return 'right';
        return 'top';
    }
}
