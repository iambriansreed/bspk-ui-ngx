import { Component } from '@angular/core';
import { Modal } from '../../../../ui/src/lib/modal/modal';
import { Button } from '../../../../ui/src/lib/button/button';

@Component({
  selector: 'modal-route',
  standalone: true,
  imports: [Modal, Button],
  template: `
    <ui-button label="Open Modal" (click)="open = true"></ui-button>

    <ui-modal
      [open]="open"
      (onClose)="open = false"
      header="Example modal"
      description="This is a demo modal"
    >
      <p>Modal content — Add any content here.</p>
    </ui-modal>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ModalRouteComponent {
  protected open = false;
}
