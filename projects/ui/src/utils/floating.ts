import { Renderer2 } from '@angular/core';
import { arrow, computePosition, ComputePositionReturn, flip, offset, shift } from '@floating-ui/dom';
import { TooltipPlacement } from '../public-api';

export class Floating {
    props: {
        placement?: TooltipPlacement;
        showTail?: boolean;
        elements: {
            reference: HTMLElement | null;
            floating: HTMLElement | null;
            arrow: HTMLElement | null;
        };
    } | null = null;

    constructor(private render: Renderer2) {}

    async compute(): Promise<ComputePositionReturn> {
        if (
            //
            !this.props?.elements.floating ||
            !this.props?.elements.reference
        )
            return {} as ComputePositionReturn;

        const { floating, reference, arrow: arrowEl } = this.props.elements;

        const returnValue = await computePosition(reference, floating, {
            placement: this.props.placement,
            strategy: 'fixed',
            middleware: [
                offset(this.props.showTail !== false ? 8 : 4),
                flip(),
                shift({ padding: 8 }),
                arrowEl ? arrow({ element: arrowEl! }) : undefined,
            ],
        });

        const {
            x,
            y,
            middlewareData: { arrow: arrowCoords },
        } = returnValue;

        this.render.setStyle(floating, 'left', `${x}px`);
        this.render.setStyle(floating, 'top', `${y}px`);
        this.render.setStyle(floating, 'position', 'fixed');

        if (arrowEl) {
            if (arrowCoords) {
                this.render.setStyle(arrowEl, 'left', `${arrowCoords?.x}px`);
                this.render.setStyle(arrowEl, 'top', `${arrowCoords?.y}px`);
            }
            // Toggle tail visibility
            this.render.setStyle(arrowEl, 'opacity', this.props.showTail !== false ? '1' : '0');
        }

        return returnValue;
    }
}
