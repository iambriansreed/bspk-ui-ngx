import { Component, Input } from '@angular/core';

export type CardVariant = 'outlined' | 'elevated';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})

export class Card {
  @Input() variant: CardVariant | undefined;
}
