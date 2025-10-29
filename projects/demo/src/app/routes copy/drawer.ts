import { Component } from '@angular/core';
import { Drawer } from '../../../../ui/src/lib/drawer/drawer';
import { Button } from '../../../../ui/src/lib/button/button';

@Component({
  selector: 'drawer-route',
  standalone: true,
  imports: [Drawer, Button],
  template: `
    <ui-button label="Open Drawer" (click)="open = true"></ui-button>

    <ui-drawer
      [open]="open"
      (onClose)="open = false"
      header="Example drawer"
      description="This is a demo drawer"
    >
      <div style="padding: 20px; width: 320px;">
        <p>This is demo drawer content.</p>
      </div>
    </ui-drawer>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class DrawerRouteComponent {
  protected open = false;
}
