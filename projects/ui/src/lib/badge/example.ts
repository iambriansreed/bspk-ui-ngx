import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIButton } from '../button';
import { IconAdd } from '../icons/add';
import { UIBadge } from './badge';

@Component({
    selector: 'ui-badge-example',
    standalone: true,
    imports: [CommonModule, UIBadge, UIButton],
    template: `
        <h4>Basic Usage</h4>
        <div>
            <ui-badge [count]="5" />
        </div>
        <div>
            <ui-badge [count]="100" />
        </div>

        <h4>Badge with Button</h4>
        <ui-badge [count]="44">
            <ui-button label="Label test" size="large" variant="secondary" [icon]="iconAdd"></ui-button>
        </ui-badge>

        <h4>Badge with Border Surface</h4>
        <ui-badge [count]="101" [surfaceBorder]="true">
            <ui-button label="Label test" size="large" variant="primary" [icon]="iconAdd"></ui-button>
        </ui-badge>

        <h4>Badge Sizes</h4>
        <div style="display: flex; gap: 16px; align-items: center;">
            <ui-badge [count]="8" size="x-small" />
            <ui-badge [count]="12" size="small" />
        </div>

        <h4>Badge Sizes on button</h4>
        <div style="display: flex; gap: 24px; align-items: center; margin-top: 8px;">
            <ui-badge [count]="3" size="x-small">
                <ui-button label="x-small" size="x-small" variant="secondary"></ui-button>
            </ui-badge>
            <ui-badge [count]="7" size="small">
                <ui-button label="small" size="small" variant="secondary"></ui-button>
            </ui-badge>
            <ui-badge [count]="310" size="x-small" [surfaceBorder]="true">
                <ui-button label="x-small" size="x-small"></ui-button>
            </ui-badge>
            <ui-badge [count]="210" size="small" [surfaceBorder]="true">
                <ui-button label="small" size="small"></ui-button>
            </ui-badge>
        </div>

        <h4>Badge color</h4>
        <div style="display: flex; gap: 16px; align-items: center;">
            <ui-badge [count]="8" size="x-small" color="primary" />
            <ui-badge [count]="12" size="small" color="primary" />
            <ui-badge [count]="8" size="x-small" color="secondary" />
            <ui-badge [count]="12" size="small" color="secondary" />
        </div>

        <h4>Badge size + color on button</h4>
        <div style="display: flex; gap: 24px; align-items: center; margin-top: 8px;">
            <ui-badge [count]="3" size="x-small" color="primary">
                <ui-button label="x-small" size="x-small" variant="secondary"></ui-button>
            </ui-badge>
            <ui-badge [count]="7" size="small" color="primary">
                <ui-button label="small" size="small" variant="secondary"></ui-button>
            </ui-badge>
            <ui-badge [count]="310" size="x-small" [surfaceBorder]="true" color="secondary">
                <ui-button label="x-small" size="x-small"></ui-button>
            </ui-badge>
            <ui-badge [count]="210" size="small" [surfaceBorder]="true" color="secondary">
                <ui-button label="small" size="small"></ui-button>
            </ui-badge>
        </div>
    `,
})
export class UIBadgeExample {
    protected readonly iconAdd = IconAdd;
}
