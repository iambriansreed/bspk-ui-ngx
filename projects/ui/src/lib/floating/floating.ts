import { Renderer2, signal } from '@angular/core';
import {
    arrow,
    computePosition,
    ComputePositionReturn,
    flip,
    MiddlewareState,
    offset,
    OffsetOptions,
    Placement,
    size,
    Strategy,
} from '@floating-ui/dom';
import { UtilityBase } from '../../types/common';

export interface FloatingUtilityProps {
    /**
     * The preferred placement of the floating element.
     *
     * This determines where the floating element will be positioned relative to the reference element.
     *
     * @default bottom-start
     */
    placement?: Placement;
    /**
     * The positioning strategy ('absolute' or 'fixed').
     *
     * When set to 'fixed', the floating element will be positioned relative to the viewport.
     *
     * When set to 'absolute', the floating element will be positioned relative to the nearest positioned ancestor.
     *
     * @default fixed
     */
    strategy?: Strategy;
    /**
     * The offset options for the floating element.
     *
     * @default 0
     */
    offsetOptions?: OffsetOptions;
    /**
     * When set to true, the width of the floating element will match the width of the reference element.
     *
     * @default false
     */
    refWidth?: boolean;
    /** The reference element for positioning. */
    reference?: HTMLElement | null;
    /** The floating element to be positioned. */
    floating?: HTMLElement | null;
    /** The arrow element for the floating element. */
    arrow?: HTMLElement | null;
}

/**
 * A utility to position an element relative to a reference element using floating UI logic.
 *
 * Should be used in components that require floating element positioning.
 */
export class FloatingUtility implements UtilityBase<FloatingUtilityProps> {
    readonly props = signal<FloatingUtilityProps>({});

    constructor(private render: Renderer2) {}
    destroy(): void {
        // No-op
    }

    updateProps(props: Partial<FloatingUtilityProps>) {
        this.props.set({
            ...this.props(),
            ...props,
        });
    }

    init(
        props: Omit<FloatingUtilityProps, 'floating' | 'reference'> &
            Required<Pick<FloatingUtilityProps, 'floating' | 'reference'>>,
    ) {
        this.updateProps(props);
    }

    async compute(nextProps?: Partial<FloatingUtilityProps>) {
        const {
            placement,
            strategy,
            offsetOptions,
            refWidth,
            floating,
            reference,
            arrow: arrowEl,
        } = {
            ...this.props(),
            ...nextProps,
        };

        if (
            // Missing required elements
            !floating ||
            !reference
        )
            return {} as ComputePositionReturn;

        this.render.setStyle(floating, 'position', strategy || 'fixed');
        this.render.setStyle(floating, 'opacity', '0');
        this.render.setStyle(floating, 'pointerEvents', 'none');

        const returnValue = await computePosition(reference, floating, {
            placement: placement || 'bottom-start',
            strategy: strategy || 'fixed',
            middleware: [
                arrowEl ? arrow({ element: arrowEl! }) : undefined,
                offset(offsetOptions),
                flip(),
                refWidth &&
                    size({
                        apply({ rects, elements }: MiddlewareState) {
                            Object.assign(elements.floating.style, {
                                width: `${rects.reference.width}px`,
                            });
                        },
                    }),
            ],
        });

        const {
            x,
            y,
            middlewareData: { arrow: arrowCoords },
        } = returnValue;

        this.render.setStyle(floating, 'left', `${x}px`);
        this.render.setStyle(floating, 'top', `${y}px`);

        setTimeout(() => {
            this.render.setStyle(floating, 'opacity', '1');
            this.render.setStyle(floating, 'pointerEvents', 'auto');
        }, 10);

        if (arrowEl) {
            if (arrowCoords) {
                this.render.setStyle(arrowEl, 'left', `${arrowCoords?.x}px`);
                this.render.setStyle(arrowEl, 'top', `${arrowCoords?.y}px`);
            }
        }

        return returnValue;
    }
}
