import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIButton } from '../button';
import { UIFocusTrapDirective } from './focus-trap.directive';

@Component({
    selector: 'ui-focus-trap-directive-example',
    standalone: true,
    imports: [CommonModule, UIFocusTrapDirective, UIButton],
    encapsulation: ViewEncapsulation.None,
    template: `
        <h4>Focus Trap</h4>

        <label style="display: block; margin: var(--spacing-sizing-08) 0;">
            <input type="checkbox" [checked]="enabled" (change)="enabled = $event.target.checked" /> Enable focus trap
            <br />
            <span style="font-size: smaller"
                >While enabled, you can only tab through elements inside the box below.</span
            >
        </label>

        <div [ui-focus-trap]="enabled">
            <div
                style="display:flex; gap: var(--spacing-sizing-04); align-items: center; padding: var(--spacing-sizing-04); border: 2px solid var(--stroke-neutral-base); border-radius: var(--radius-md);">
                <ui-button id="one" label="One" variant="tertiary" (click)="send('Button one clicked')"></ui-button>
                <ui-button id="two" label="Two" variant="secondary" (click)="send('Button two clicked')"></ui-button>
                <a href="/focus-trap#link" data-subtle id="three" tabindex="0" (click)="send('Link three clicked')"
                    >Three (link)</a
                >
            </div>
        </div>

        <p style="margin-top: var(--spacing-sizing-08);">
            Outside button (should not receive focus when trap enabled):
        </p>
        <p>
            <ui-button
                id="outside"
                label="Outside"
                variant="secondary"
                (click)="send('Outside button clicked')"></ui-button>
        </p>
    `,
})
export class UIFocusTrapDirectiveExample {
    enabled = true;

    send = sendSnackbar;
}
