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
    createComponent,
    effect,
    inject,
    model,
    signal,
    viewChild,
} from '@angular/core';
import { autoUpdate, Placement } from '@floating-ui/dom';
import { AsSignal } from '../../types/common';
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
 * ```html
 * <span
 *     role="note"
 *     [ui-tooltip]="{
 *     label: 'I explain what this button does',
 *     placement: 'top',
 *     }"
 *     >Hover me</span
 * >
 * ```
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
    /**
     * The value of the tooltip directive. Can be a string for simple usage or an object for more control.
     *
     * When using the truncated option, the tooltip will only show when the content is truncated and will use the text
     * content of the reference element as the label. This is useful for cases like table cells where you want to show a
     * tooltip only when the content is too long to fit.
     *
     * Note: When using the truncated option, the directive will add a data-truncated attribute to the host element.
     * This can be used for styling purposes.
     */
    readonly value = model<TooltipProps | string | { truncated: true } | undefined>(undefined, {
        alias: 'ui-tooltip',
    });

    readonly tooltipId = uniqueId('tooltip');

    readonly props = computed(() => {
        const value = this.value();

        const next: TooltipProps & { truncated?: true } = {
            showTail: true,
        };

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

    private readonly computedPlacement = signal<TooltipPlacement | null>(null);
    private tooltipComponent?: ComponentRef<UITooltip> | null;
    private autoUpdateCleanup?: () => void;

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

        if (
            !props.label ||
            event.target !== this.referenceEl ||
            props.disabled ||
            // skip if not actively truncated
            (props.truncated && this.referenceEl?.scrollWidth <= this.referenceEl?.clientWidth)
        )
            return;

        if (props.truncated) this.addComponent({ label: this.referenceEl.textContent || '' });

        if (this.tooltipEl) this.renderer.setStyle(this.tooltipEl, 'display', 'block');

        const floatingProps = {
            placement: this.props()?.placement || 'top',
            reference: this.referenceEl,
            floating: this.tooltipEl,
            arrow: this.arrowEl,
            offsetOptions: this.arrowEl ? 8 : 4,
            refWidth: false,
        };

        this.floating.compute(floatingProps).then(({ placement }) => {
            if (this.tooltipEl && placement !== this.props()?.placement)
                this.computedPlacement.set(placement as TooltipPlacement);
        });

        this.autoUpdateCleanup = autoUpdate(this.referenceEl!, this.tooltipEl!, () => {
            requestAnimationFrame(() => this.floating.compute(floatingProps));
        });
    }

    handleCloseEvent() {
        this.autoUpdateCleanup?.();

        const { label, truncated } = this.props();
        if (!label) return;

        if (truncated) this.removeComponent();
        if (this.tooltipEl) this.renderer.setStyle(this.tooltipEl, 'display', 'none');
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

        const componentElement = this.document.createElement('ui-tooltip');
        this.document.body.appendChild(componentElement);

        this.tooltipComponent = createComponent(UITooltip, {
            environmentInjector: this.env,
            hostElement: componentElement,
        });

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
}

/**
 * Single use component to display tooltip content.
 *
 * @ignore
 */
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
    readonly showTail = model<TooltipProps['showTail']>(true);

    get arrowElement(): HTMLElement | null {
        return this.arrow()?.nativeElement || null;
    }
}
