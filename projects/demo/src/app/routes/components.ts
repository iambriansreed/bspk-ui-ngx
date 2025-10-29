/** generated: 2025-10-29T18:36:35.101Z */
import { Component } from '@angular/core';
import { Accordion } from '../../../../../projects/ui/src/lib/accordion/accordion';
import { Badge } from '../../../../../projects/ui/src/lib/badge/badge';
import { IconAdd } from '../../../../../projects/ui/src/lib/icons/add';
import { Button } from '../../../../../projects/ui/src/lib/button/button';
import { Card } from '../../../../../projects/ui/src/lib/card/card';
import { Dialog } from '../../../../../projects/ui/src/lib/dialog/dialog';
import { Drawer } from '../../../../../projects/ui/src/lib/drawer/drawer';
import { Modal } from '../../../../../projects/ui/src/lib/modal/modal';
import { TooltipDirective } from '../../../../../projects/ui/src/lib/tooltip/tooltip.directive';

@Component({
  selector: 'accordion-route',
  standalone: true,
  imports: [Accordion],
  template: `<div style="margin: 16px; width: 300px">
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
</div>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class AccordionRouteComponent { }


@Component({
  selector: 'badge-route',
  standalone: true,
  imports: [Badge, Badge, Badge, Button, Badge, Button, IconAdd, Badge],
  template: `<ng-template #addIcon>
  <icon-add></icon-add>
</ng-template>
<ui-badge [count]="5" />
<ui-badge [count]="100" />
<ui-badge [count]="44">
  <ui-button label="Label test" size="large" variant="secondary" [icon]="addIcon"></ui-button>
</ui-badge>
<ui-badge [count]="101" [surfaceBorder]="true">
  <ui-button label="Label test" size="large" variant="primary" [icon]="addIcon"></ui-button>
</ui-badge>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class BadgeRouteComponent { }


@Component({
  selector: 'button-route',
  standalone: true,
  imports: [Button, Button, Button, Button, IconAdd, IconAdd, Button],
  template: `<ng-template #addIcon>
  <icon-add></icon-add>
</ng-template>
<ui-button label="Label test" size="large" [icon]="addIcon" />
<ui-button label="Label test" size="medium" variant="secondary" [icon]="addIcon" />
<ui-button label="Label test" size="small" variant="tertiary" [icon]="addIcon" />
<ui-button><icon-add width="24" />Custom Content Example</ui-button>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ButtonRouteComponent { }


@Component({
  selector: 'card-route',
  standalone: true,
  imports: [Card, Card, Card],
  template: `<div style="width: 300px">
  <ui-card variant="outlined">
    <p>Card works! <br />(variant="outlined")</p>
  </ui-card>
</div>
<div style="width: 300px">
  <ui-card variant="elevated">
    <p>Card works! <br />(variant="elevated")</p>
  </ui-card>
</div>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class CardRouteComponent { }


@Component({
  selector: 'dialog-route',
  standalone: true,
  imports: [Button, Button, Dialog],
  template: `<ui-button label="Open Dialog" (click)="open = true"></ui-button>

<ui-dialog
  [open]="open"
  (onClose)="open = false"
  header="Example dialog"
  description="This is a demo dialog"
>
  <div style="padding: 20px">
    <p>This is demo dialog content.</p>
    <ui-button label="Close" (click)="open = false"></ui-button>
  </div>
</ui-dialog>`,
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


@Component({
  selector: 'drawer-route',
  standalone: true,
  imports: [Button, Drawer],
  template: `<ui-button label="Open Drawer" (click)="open = true"></ui-button>

<ui-drawer
  [open]="open"
  (onClose)="open = false"
  header="Example drawer"
  description="This is a demo drawer"
>
  <div style="padding: 20px; width: 320px">
    <p>This is demo drawer content.</p>
  </div>
</ui-drawer>`,
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


@Component({
  selector: 'modal-route',
  standalone: true,
  imports: [Button, Modal],
  template: `<ui-button label="Open Modal" (click)="open = true"></ui-button>

<ui-modal
  [open]="open"
  (onClose)="open = false"
  header="Example modal"
  description="This is a demo modal"
>
  <p>Modal content — Add any content here.</p>
</ui-modal>`,
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


@Component({
  selector: 'tooltip-route',
  imports: [TooltipDirective],
  template: `<div style="margin: 16px; width: 300px">
  <span [tooltip]="{ label: 'Told ya!', showTail: true, placement: 'bottom' }"
    >Hover me for tooltip!</span
  >
</div>`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class TooltipRouteComponent {}
