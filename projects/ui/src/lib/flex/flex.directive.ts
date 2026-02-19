import { Directive, computed, input } from '@angular/core';
import { AsSignal } from '../../types/common';
import { SizingPixels } from '../../utils/sizing';

export interface FlexProps {
    /** The gap between the children. */
    gap?: SizingPixels | 'auto';
    /**
     * The align-items style to apply to the Flex.
     *
     * @default flex-start
     */
    align?: 'baseline' | 'center' | 'end' | 'flex-end' | 'flex-start' | 'start' | 'stretch';
    /**
     * The justification style to apply to the Flex.
     *
     * @default flex-start
     */
    justify?:
        | 'around'
        | 'between'
        | 'center'
        | 'end'
        | 'evenly'
        | 'flex-end'
        | 'flex-start'
        | 'space-around'
        | 'space-between'
        | 'space-evenly'
        | 'start';
    /**
     * The flex-wrap style to apply to the Flex.
     *
     * @default nowrap
     */
    wrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
    /**
     * The flex-direction style to apply to the Flex.
     *
     * @default row
     */
    direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
    /** The padding to apply to the Flex. */
    padding?: SizingPixels | SizingPixels[];
    /** If true the Flex will take up the full width of its container. */
    full?: boolean;
}

interface FlexUtilityProps {
    flex: FlexProps | string | undefined;
}

/**
 * Apply flexbox layout to an element.
 *
 * ```html
 * <div [ui-flex]="{ direction: 'column', justify: 'between', align: 'center', wrap: 'wrap', gap: '8' }">
 *     <ui-tag label="Child 1" color="red" />
 *     <ui-tag label="Child 2" color="blue" />
 *     <ui-tag label="Child 3" color="green" />
 * </div>
 * ```
 *
 * @name Flex
 * @phase Utility
 */
@Directive({
    selector: '[ui-flex]',
    standalone: true,
    host: {
        '[style]': 'computedStyle()',
    },
})
export class UIFlexDirective implements AsSignal<FlexUtilityProps> {
    readonly computedStyle = computed(() => {
        const flex = typeof this.flex() === 'string' ? {} : (this.flex() as FlexProps);

        return {
            display: 'flex',
            flexDirection: flex?.direction,
            justifyContent: this.normalizeJustify(flex?.justify),
            alignItems: this.normalizeAlign(flex?.align),
            flexWrap: flex?.wrap,
            gap: this.normalizeGap(flex?.gap),
        };
    });

    readonly flex = input<FlexUtilityProps['flex']>({}, { alias: 'ui-flex' });

    private normalizeJustify(v: FlexProps['justify']): string {
        switch (v) {
            case 'start':
                return 'flex-start';
            case 'end':
                return 'flex-end';
            case 'between':
                return 'space-between';
            case 'around':
                return 'space-around';
            case 'evenly':
                return 'space-evenly';
            default:
                return v || 'flex-start';
        }
    }

    private normalizeAlign(v: FlexProps['align']): string {
        switch (v) {
            case 'start':
                return 'flex-start';
            case 'end':
                return 'flex-end';
            default:
                return v || 'stretch';
        }
    }

    private normalizeGap(v: FlexProps['gap']): string {
        if (v === 'auto') return 'var(--spacing-sizing-02)';
        if (v && (typeof v === 'number' || /^\d+$/.test(v))) return `${v}px`;
        return v || '';
    }
}
