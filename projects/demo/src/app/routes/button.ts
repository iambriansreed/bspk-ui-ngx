import { Component } from '@angular/core';
import { Button } from '../../../../../projects/ui/src/lib/button/button';
import { IconAdd } from '../../../../../projects/ui/src/lib/icons/add';

@Component({
  selector: 'button-route',
  standalone: true,
  imports: [Button, IconAdd],
  template: `
    <ng-template #addIcon>
      <icon-add></icon-add>
    </ng-template>
    <ui-button label="Label test" size="large" [icon]="addIcon" />
    <ui-button label="Label test" size="medium" variant="secondary" [icon]="addIcon" />
    <ui-button label="Label test" size="small" variant="tertiary" [icon]="addIcon" />
    <ui-button><icon-add width="24" />Custom Content Example</ui-button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ButtonRouteComponent {}
