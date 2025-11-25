import { Component, Input, ViewEncapsulation } from '@angular/core';

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
 * @phase UXReview
 */
@Component({
    selector: 'ui-card',
    standalone: true,
    imports: [],
    templateUrl: './card.html',
    styleUrl: './card.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UICard {
    /**
     * Determines how the card border will appear.
     *
     * @default elevated
     */
    @Input() variant: CardVariant = 'elevated';
}
