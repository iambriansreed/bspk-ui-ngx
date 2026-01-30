import { computed, Directive, input } from '@angular/core';
import { AsSignal } from '../../types/common';

export type TxtVariant =
    | 'body-base'
    | 'body-large'
    | 'body-small'
    | 'body-x-small'
    | 'display-regular-large'
    | 'display-regular-medium'
    | 'display-regular-small'
    | 'display-semibold-large'
    | 'display-semibold-medium'
    | 'display-semibold-small'
    | 'heading-h1'
    | 'heading-h2'
    | 'heading-h3'
    | 'heading-h4'
    | 'heading-h5'
    | 'heading-h6'
    | 'labels-base'
    | 'labels-large'
    | 'labels-small'
    | 'labels-x-small'
    | 'subheader-large'
    | 'subheader-medium'
    | 'subheader-x-large'
    | 'subheader-xx-large'
    | 'subheader-xxx-large';

export interface TxtProps {
    /**
     * The variant to use.
     *
     * @default body-base
     */
    variant?: TxtVariant;
    /** The id of the element. */
    id?: string;
    /**
     * Inherit style and not set font style.
     *
     * @default false
     */
    inherit?: boolean;
}

/**
 * A directive that applies the correct font styles based on the variant and size.
 *
 * @example
 *     <div ui-txt="heading-h3">This is a heading</div>
 *
 * @name Txt
 * @phase UXReview
 */
@Directive({
    selector: '[ui-txt]',
    host: {
        '[attr.data-txt]': 'variant()',
        '[style.font]': 'inherit() ? null : font()',
        '[attr.id]': 'id()',
    },
})
export class UITxtDirective implements AsSignal<TxtProps> {
    readonly variant = input<TxtProps['variant']>('body-base', { alias: 'ui-txt' });
    readonly id = input<TxtProps['id']>();
    readonly inherit = input<TxtProps['inherit']>(false);

    readonly font = computed(() => `var(--${this.variant() || 'body-base'})`);
}
