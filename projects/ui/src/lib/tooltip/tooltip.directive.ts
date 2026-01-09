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
import { uniqueId } from '../../utils';
import { addComponent } from '../../utils/add-component';
import { FloatingUtility } from '../../utils/floating';

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
            return { ...next, label: value };
        } else {
            return { ...next, ...value };
        }
    });

    host = inject<ElementRef<HTMLElement>>(ElementRef);
    renderer = inject(Renderer2);
    env = inject(EnvironmentInjector);
    document = inject<Document>(DOCUMENT);

    floating = new FloatingUtility(this.renderer);

    private readonly computedPlacement = signal<TooltipPlacement>('top');
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
        this.tooltipComponent.instance.props.set(props);
        this.tooltipComponent.changeDetectorRef.detectChanges();
    }

    handleOpenEvent(event: Event) {
        const props = this.props();

        if (
            event.target !== this.referenceEl ||
            props.disabled ||
            // skip if not actively truncated
            (props.truncated && this.referenceEl?.scrollWidth <= this.referenceEl?.clientWidth)
        )
            return;

        if (props.truncated) this.addComponent({ label: this.referenceEl.textContent || '' });

        this.renderer.setStyle(this.tooltipEl, 'display', 'block');

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
        if (this.props().truncated) this.removeComponent();
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

        this.tooltipComponent = addComponent(this.env, UITooltip, 'ui-tooltip')!;

        this.renderer.setStyle(this.tooltipEl, 'display', 'none');
        this.tooltipComponent.instance.id.set(this.tooltipId);
        this.updateTooltipProps(props);
        return true;
    }

    ngOnInit(): void {
        if (!this.referenceEl) return;

        if (this.props().truncated) {
            this.renderer.setAttribute(this.referenceEl, 'data-truncated', 'true');
        } else {
            this.renderer.setAttribute(this.referenceEl, 'aria-labelledby', this.tooltipId);
            this.addComponent(this.props());
        }
    }
}

/** Single use component to display tooltip content. */
@Component({
    selector: 'ui-tooltip',
    standalone: true,
    template: `
        <span data-text>{{ props().label }}</span>
        @if (props().showTail !== false) {
            <span aria-hidden="true" data-arrow #arrow></span>
        }
    `,
    styleUrl: './tooltip.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'tooltip',
        role: 'tooltip',
        '[attr.data-placement]': 'props().placement || "top"',
        '[attr.id]': 'id() || null',
    },
})
class UITooltip {
    readonly arrow = viewChild<ElementRef>('arrow');

    /** Tooltip id for a11y labelling */
    readonly id = signal<string | undefined>(undefined);

    readonly props = model<TooltipProps>({});

    get arrowElement(): HTMLElement | null {
        return this.arrow()?.nativeElement || null;
    }
}
