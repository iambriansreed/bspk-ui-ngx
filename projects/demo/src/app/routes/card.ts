import { Component } from '@angular/core';
import { Card } from '../../../../../projects/ui/src/lib/card/card';

@Component({
  selector: 'card-route',
  standalone: true,
  imports: [Card],
  template: `
    <div style="width: 300px">
      <ui-card variant="outlined">
        <p>Card works! <br />(variant="outlined")</p>
      </ui-card>
    </div>
    <div style="width: 300px">
      <ui-card variant="elevated">
        <p>Card works! <br />(variant="elevated")</p>
      </ui-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class CardRouteComponent {}
