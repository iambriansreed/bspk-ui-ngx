import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIBadge } from './badge';
import { UIButton } from '../button';
import { IconAdd } from '../icons/add';

@Component({
    selector: 'ui-badge-example',
    standalone: true,
    imports: [CommonModule, UIBadge, UIButton],
    template: `
        <h2>Badge</h2>

        <h3>Basic Usage</h3>

        <div>
            <ui-badge [count]="5" />
        </div>
        <div>
            <ui-badge [count]="100" />
        </div>

        <h3>Badge with Button</h3>

        <ui-badge [count]="44">
            <ui-button label="Label test" size="large" variant="secondary" [icon]="iconAdd"></ui-button>
        </ui-badge>

        <h3>Badge with Border Surface</h3>

        <ui-badge [count]="101" [surfaceBorder]="true">
            <ui-button label="Label test" size="large" variant="primary" [icon]="iconAdd"></ui-button>
        </ui-badge>
    `,
})
export class UIBadgeExample {
    protected readonly iconAdd = IconAdd;
}
