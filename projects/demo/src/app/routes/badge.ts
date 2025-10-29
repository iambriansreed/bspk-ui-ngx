import { Component } from '@angular/core';
import { Badge } from '../../../../../projects/ui/src/lib/badge/badge';
import { Button } from '../../../../../projects/ui/src/lib/button/button';
import { IconAdd } from '../../../../../projects/ui/src/lib/icons/add';

@Component({
  selector: 'badge-route',
  standalone: true,
  imports: [Badge, Button, IconAdd],
  template: `
  <div style="display: flex; flex-direction: column; gap: 16px;">
  <ng-template #addIcon>
      <icon-add></icon-add>
    </ng-template>
    <ui-badge [count]="5" />
    <ui-badge [count]="15" size="small" />
    <ui-badge [count]="25" size="x-small" color="secondary" />
    <ui-badge [count]="100" />
    <ui-badge [count]="44">
        <ui-button label="Label test" size="large" variant="secondary" [icon]="addIcon"></ui-button>
    </ui-badge>
    <ui-badge [count]="101" [surfaceBorder]="true" color="secondary">
        <ui-button label="Label test" size="large" variant="primary" [icon]="addIcon"></ui-button>
    </ui-badge>
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
export class BadgeRouteComponent {}
