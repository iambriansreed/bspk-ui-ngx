import { Component, ViewEncapsulation, input } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined';

/**
 * Cards are often rectangular and contain various content, such as text, images, icons, multimedia, and interactive
 * elements.
 *
 * They are similar in size and shape to playing cards and are intended to encourage users to click or tap to view more
 * details.
 *
 * @example
 *     import { Card } from '@bspk/ui/card';
 *
 *     <Card variant="elevated" style={{ padding: 'var(--spacing-sizing-04)', maxWidth: '100%', width: '400px' }}>
 *     <h3>Card Title</h3>
 *     <p>This is some content inside the card.</p>
 *     </Card>;
 *
 * @name Card
 * @phase Dev
 */
@Component({
    selector: 'ui-card',
    standalone: true,
    imports: [],
    template: `<ng-content></ng-content>`,
    styleUrl: './card.scss',
    host: {
        'data-bspk': 'card',
        '[attr.data-variant]': 'variant()',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UICard {
    /**
     * Determines how the card border will appear.
     *
     * @default elevated
     */
    readonly variant = input<CardVariant>('elevated');
}
