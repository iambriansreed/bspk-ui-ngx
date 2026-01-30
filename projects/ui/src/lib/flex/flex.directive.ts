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

/**
 * Apply flexbox layout to an element.
 *
 * Usage examples: <div uiFlex></div> <div [uiFlex]="'inline'" direction="column" justify="between" align="center"
 * wrap="wrap" gap="8px"></div>
 */
@Directive({
    selector: '[ui-flex]',
    standalone: true,
    host: {
        '[style]': 'computedStyle()',
    },
})
export class UIFlexDirective implements AsSignal<FlexProps> {
    readonly computedStyle = computed(() => ({
        display: 'flex',
        flexDirection: this.direction(),
        justifyContent: this.normalizeJustify(this.justify()),
        alignItems: this.normalizeAlign(this.align()),
        flexWrap: this.wrap(),
        gap: this.gap() ?? null,
    }));

    readonly direction = input<FlexProps['direction']>('row');
    readonly justify = input<FlexProps['justify']>('flex-start');
    readonly align = input<FlexProps['align']>('stretch');
    readonly wrap = input<FlexProps['wrap']>('nowrap');
    readonly gap = input<FlexProps['gap']>();

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
}
