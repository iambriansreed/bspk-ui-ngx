import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIButton } from '../button';
import { UICard } from '../card';
import { UIFlexDirective } from '../flex';
import { UISwitchOption } from '../switch-option';
import { UIFocusTrapDirective } from './focus-trap.directive';

/**
 * Advanced example of using the focus trap directive with multiple focusable elements and a toggle to enable/disable
 * the trap.
 *
 * @ignore
 */
@Component({
    selector: 'ui-focus-trap-advanced-example',
    imports: [UIFocusTrapDirective, UIButton, UISwitchOption, UICard, UIFlexDirective],
    template: `<div [ui-flex]="{ direction: 'column', gap: '8' }">
        <div style="width: 200px">
            <ui-switch-option
                label="Enable focus trap"
                value=""
                name="focus-switch"
                [id]="'focus-switch'"
                type="checkbox"
                [(checked)]="enabled" />
        </div>

        <div>While enabled, you can only tab through elements inside the box below.</div>

        <ui-card
            [ui-focus-trap]="enabled"
            [ui-flex]="{ gap: '4', align: 'center', padding: '4', direction: 'column' }"
            style="display:flex; gap: var(--spacing-sizing-04); align-items: center; padding: var(--spacing-sizing-04); border: 2px solid var(--stroke-neutral-base); border-radius: var(--radius-md);">
            <ui-button
                id="one"
                label="One"
                variant="tertiary"
                (onClick)="sendSnackbar('Button one clicked')"></ui-button>
            <ui-button
                id="two"
                label="Two"
                variant="secondary"
                (onClick)="sendSnackbar('Button two clicked')"></ui-button>
            <a href="/focus-trap#link" data-subtle id="three" tabindex="0" (click)="sendSnackbar('Link three clicked')"
                >Three (link)</a
            >
        </ui-card>
    </div>`,
})
export class UIFocusTrapAdvancedExample {
    enabled = true;
    sendSnackbar = sendSnackbar;
}
