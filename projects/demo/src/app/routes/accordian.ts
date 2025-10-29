import { Component } from '@angular/core';
import { Accordion } from '../../../../ui/src/lib/accordion/accordion';

@Component({
  selector: 'accordion-route',
  standalone: true,
  imports: [Accordion],
  template: `
    <div style="margin: 16px; width: 300px">
      <ui-accordion
        [singleOpen]="false"
        [items]="[
          { title: 'Foo', children: 'Foo Children' },
          { title: 'Bar', children: 'Bar Children' },
          { title: 'Car', children: 'Car Children' }
        ]"
      ></ui-accordion>
      <ui-accordion
        [singleOpen]="true"
        [items]="[
          { title: 'Foo', children: 'Foo Children' },
          { title: 'Bar', children: 'Bar Children' },
          { title: 'Car', children: 'Car Children' }
        ]"
      ></ui-accordion>
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
export class AccordionRouteComponent {}
