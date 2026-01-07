import { Renderer2 } from '@angular/core';
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

export interface FloatingProps {
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
    /** Whether to hide the floating element. */
    hide?: boolean;
    /** The reference element for positioning. */
    reference?: HTMLElement | null;
    /** The floating element to be positioned. */
    floating?: HTMLElement | null;
    /** The arrow element for the floating element. */
    arrow?: HTMLElement | null;
}

export class Floating {
    private props: FloatingProps | null = null;

    constructor(
        private render: Renderer2,
        defaultProps?: FloatingProps,
    ) {
        this.props = defaultProps || null;
    }

    setProps(props: FloatingProps) {
        this.props = {
            ...this.props,
            ...props,
        };
    }

    async compute() {
        if (
            //
            !this.props?.floating ||
            !this.props?.reference
        )
            return {} as ComputePositionReturn;

        const { floating, reference, arrow: arrowEl } = this.props;

        this.render.setStyle(floating, 'position', this.props?.strategy || 'fixed');
        this.render.setStyle(floating, 'opacity', '0');
        this.render.setStyle(floating, 'pointerEvents', 'none');

        const returnValue = await computePosition(reference, floating, {
            placement: this.props.placement || 'bottom-start',
            strategy: 'fixed',
            middleware: [
                arrowEl ? arrow({ element: arrowEl! }) : undefined,
                offset(this.props.offsetOptions),
                flip(),
                this.props.refWidth &&
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
