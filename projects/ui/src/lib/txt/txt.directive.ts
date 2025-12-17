import { computed, Directive, input } from '@angular/core';

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

@Directive({
    selector: '[ui-txt]',
    host: {
        '[attr.data-txt]': 'variant()',
        '[style.font]': 'font()',
    },
})
export class UITxtDirective {
    readonly variant = input<TxtVariant | ''>('body-base', { alias: 'ui-txt' });
    readonly font = computed(() => `var(--${this.variant() || 'body-base'})`);
}
