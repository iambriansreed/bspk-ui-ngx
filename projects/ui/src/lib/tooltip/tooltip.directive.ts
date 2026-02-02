import { DOCUMENT } from '@angular/common';
import {
    Component,
    ComponentRef,
    Directive,
    ElementRef,
    EnvironmentInjector,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewEncapsulation,
    computed,
    effect,
    inject,
    model,
    signal,
    viewChild,
} from '@angular/core';
import { Placement } from '@floating-ui/dom';
import { AsSignal } from '../../types/common';
import { addComponent } from '../../utils/add-component';
import { uniqueId } from '../../utils/random';
import { FloatingUtility } from '../floating/floating';

export type TooltipPlacement = Extract<Placement, 'bottom' | 'left' | 'right' | 'top'>;

export interface TooltipProps {
    /** The tooltip content. */
    label?: string;
    /**
     * The placement of the tooltip.
     *
     * @default top
     */
    placement?: TooltipPlacement;
    /**
     * Whether to visually show the arrow (tail).
     *
     * @default true
     */
    showTail?: boolean;
    /**
     * Determines if the tooltip is disabled.
     *
     * @default false
     */
    disabled?: boolean;
}

/**
 * Brief message that provide additional guidance and helps users perform an action if needed.
 *
 * @example
 *     <span [ui-tooltip]="{
 *     label: 'I explain what this button does',
 *     placement: 'top',
 *     }">Hover me</span>
 *
 * @name Tooltip
 * @phase Dev
 */
@Directive({
    selector: '[ui-tooltip]',
    standalone: true,
    host: {
        '(mouseenter)': 'handleOpenEvent($event)',
        '(mouseleave)': 'handleCloseEvent()',
        '(focusin)': 'handleOpenEvent($event)',
        '(blur)': 'handleCloseEvent()',
    },
})
export class UITooltipDirective implements OnDestroy, OnInit {
    readonly value = model<TooltipProps | string | { truncated: true } | undefined>(undefined, {
        alias: 'ui-tooltip',
    });

    readonly tooltipId = uniqueId('tooltip');

    readonly props = computed(() => {
        const value = this.value();

        const next: TooltipProps & { truncated?: true } = {};

        if (!value) return next;

        if (typeof value === 'string') {
            return { ...next, label: value.trim() };
        } else {
            return { ...next, ...value };
        }
    });

    host = inject<ElementRef<HTMLElement>>(ElementRef);
    renderer = inject(Renderer2);
    env = inject(EnvironmentInjector);
    document = inject<Document>(DOCUMENT);

    floating = new FloatingUtility(this.renderer);

    private isTooltipOpen = false;

    private readonly computedPlacement = signal<TooltipPlacement | null>(null);
    private tooltipComponent?: ComponentRef<UITooltip> | null;

    constructor() {
        effect(() => {
            this.updateTooltipProps(this.props());
        });
    }

    get arrowEl() {
        return this.tooltipComponent?.instance.arrowElement;
    }

    get tooltipEl() {
        return this.tooltipComponent?.location.nativeElement as HTMLElement;
    }

    get referenceEl() {
        let el = this.host.nativeElement;
        if (!el?.checkVisibility?.()) el = (el?.firstElementChild as HTMLElement) || null;
        return el;
    }

    updateTooltipProps(props: TooltipProps) {
        if (!this.tooltipComponent) return;
        this.tooltipComponent.instance.label.set(props.label);
        this.tooltipComponent.instance.disabled.set(props.disabled);
        this.tooltipComponent.instance.showTail.set(props.showTail);
        this.tooltipComponent.instance.placement.set(this.computedPlacement() || props.placement);
        this.tooltipComponent.changeDetectorRef.detectChanges();
    }

    handleOpenEvent(event: Event) {
        const props = this.props();

        if (this.isTooltipOpen) return; // Prevent duplicate opens

        if (
            !props.label ||
            event.target !== this.referenceEl ||
            props.disabled ||
            // skip if not actively truncated
            (props.truncated && this.referenceEl?.scrollWidth <= this.referenceEl?.clientWidth)
        )
            return;

        if (props.truncated) this.addComponent({ label: this.referenceEl.textContent || '' });

        // Only show if not already visible
        if (this.tooltipEl && this.tooltipEl.style.display !== 'block') {
            this.renderer.setStyle(this.tooltipEl, 'display', 'block');
        }

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

        this.addGlobalListeners();
        this.repositionTooltip();

        this.isTooltipOpen = true;
    }

    handleCloseEvent() {
        const { label, truncated } = this.props();
        if (!label) return;

        // For truncated tooltips, remove component on close
        if (truncated && this.tooltipComponent) this.removeComponent();

        // Only hide if currently visible
        if (this.tooltipEl && this.tooltipEl.style.display !== 'none') {
            this.renderer.setStyle(this.tooltipEl, 'display', 'none');
        }

        this.removeGlobalListeners();
        this.isTooltipOpen = false;
    }

    ngOnDestroy(): void {
        this.handleCloseEvent();
        if (this.referenceEl) this.renderer.removeAttribute(this.referenceEl, 'aria-labelledby');

        this.removeComponent();
    }

    removeComponent() {
        if (this.tooltipComponent) {
            this.renderer.removeChild(this.tooltipEl.parentNode, this.tooltipEl);
            this.tooltipComponent.destroy();
            this.tooltipComponent = null;
        }
    }

    addComponent(props = this.props()): boolean {
        if (
            // if we can't render or already rendered or disabled or no label we can't show
            !this.document ||
            !this.referenceEl ||
            !props.label
        ) {
            return false;
        }

        this.tooltipComponent = addComponent(this.env, UITooltip, 'ui-tooltip')!;

        if (this.tooltipEl) this.renderer.setStyle(this.tooltipEl, 'display', 'none');
        this.tooltipComponent.instance.id.set(this.tooltipId);
        this.updateTooltipProps(props);
        return true;
    }

    ngOnInit(): void {
        if (!this.referenceEl || !this.props().label) return;

        if (this.props().truncated) {
            this.renderer.setAttribute(this.referenceEl, 'data-truncated', 'true');
        } else {
            this.renderer.setAttribute(this.referenceEl, 'aria-labelledby', this.tooltipId);
            this.addComponent(this.props());
        }
    }

    private scrollHandler = () => this.repositionTooltip();
    private resizeHandler = () => this.repositionTooltip();

    // Call this after showing the tooltip
    private addGlobalListeners() {
        window.addEventListener('scroll', this.scrollHandler, true);
        window.addEventListener('resize', this.resizeHandler, true);
    }

    // Call this after hiding the tooltip
    private removeGlobalListeners() {
        window.removeEventListener('scroll', this.scrollHandler, true);
        window.removeEventListener('resize', this.resizeHandler, true);
    }

    private repositionTooltip() {
        // Only reposition if tooltip is open and exists
        if (this.isTooltipOpen && this.tooltipEl && this.referenceEl) {
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
    }
}

/** Single use component to display tooltip content. */
@Component({
    selector: 'ui-tooltip',
    standalone: true,
    template: `
        <span data-text>{{ label() }}</span>
        @if (showTail() !== false) {
            <span aria-hidden="true" data-arrow #arrow></span>
        }
    `,
    styleUrl: './tooltip.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'tooltip',
        role: 'tooltip',
        '[attr.data-placement]': 'placement() || "top"',
        '[attr.id]': 'id() || null',
    },
})
export class UITooltip implements AsSignal<TooltipProps> {
    readonly arrow = viewChild<ElementRef>('arrow');
    readonly id = signal<string | undefined>(undefined);
    readonly disabled = model<TooltipProps['disabled']>(false);
    readonly label = model<TooltipProps['label']>();
    readonly placement = model<TooltipProps['placement']>();
    readonly showTail = model<TooltipProps['showTail']>();

    get arrowElement(): HTMLElement | null {
        return this.arrow()?.nativeElement || null;
    }
}
