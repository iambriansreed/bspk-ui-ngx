import { Component, Input, ViewEncapsulation } from '@angular/core';

export type CardVariant = 'elevated' | 'outlined';

@Component({
    selector: 'ui-card',
    standalone: true,
    imports: [],
    templateUrl: './card.html',
    styleUrl: './card.scss',
    encapsulation: ViewEncapsulation.None,
})
export class Card {
     /**
     * Determines how the card border will appear.
     *
     * @default elevated
     */
     @Input() variant: CardVariant = 'elevated';
}
