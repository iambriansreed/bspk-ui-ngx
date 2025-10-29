import { Component } from '@angular/core';
import { Dialog } from '../../../../ui/src/lib/dialog/dialog';
import { Button } from '../../../../ui/src/lib/button/button';

@Component({
  selector: 'dialog-route',
  standalone: true,
  imports: [Dialog, Button],
  template: `
    <ui-button label="Open Dialog" (click)="open = true"></ui-button>

    <ui-dialog
      [open]="open"
      (onClose)="open = false"
      header="Example dialog"
      description="This is a demo dialog"
    >
      <div style="padding: 20px;">
        <p>This is demo dialog content.</p>
        <ui-button label="Close" (click)="open = false"></ui-button>
      </div>
    </ui-dialog>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class DialogRouteComponent {
  protected open = false;
}
