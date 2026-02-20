import { Component } from '@angular/core';
import { ComponentSettings } from '@shared/types';
import { sendSnackbar } from '../../utils/send-snackbar';
import { UIButton } from '../button';
import { UICard } from '../card';
import { UISwitchOption } from '../switch-option';
import { UIFocusTrapDirective } from './focus-trap.directive';
import { FocusTrapProps } from './';

const basicUsageTemplate = `<ui-card variant="outlined" style="padding: var(--spacing-sizing-04);">
        <ui-switch-option
            name=""
            value=""
            label="Enable focus trap"
            [(checked)]="enabled"
            style="margin-bottom: var(--spacing-sizing-08);" />

        <span style="font-size: smaller">While enabled, you can only tab through elements inside the box below.</span>

       <!-- Directive used here. Make sure there is a focusable element inside the trap. -->
        <div [ui-focus-trap]="enabled">
            <div
                style="display:flex; gap: var(--spacing-sizing-04); align-items: center; padding: var(--spacing-sizing-04); border: 2px solid var(--stroke-neutral-base); border-radius: var(--radius-md);">
                <ui-button
                    id="one"
                    label="One"
                    variant="tertiary"
                    (click)="sendSnackbar('Button one clicked')"></ui-button>
                <ui-button
                    id="two"
                    label="Two"
                    variant="secondary"
                    (click)="sendSnackbar('Button two clicked')"></ui-button>
                <a
                    href="/focus-trap#link"
                    data-subtle
                    id="three"
                    tabindex="0"
                    (click)="sendSnackbar('Link three clicked')"
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
                (click)="sendSnackbar('Outside button clicked')"></ui-button>
        </p>
    </ui-card>`;

/** @ignore */
@Component({
    selector: 'ui-focus-basic-usage',
    host: { style: 'display: contents' },
    imports: [UIFocusTrapDirective, UIButton, UISwitchOption, UICard],
    template: basicUsageTemplate,
})
export class UIFocusTrapBasicUsage {
    enabled = false;
    sendSnackbar = sendSnackbar;
}

export const FocusTrap: ComponentSettings<FocusTrapProps> = {
    hideExamples: true,
    basicUsage: {
        component: UIFocusTrapBasicUsage,
        template: basicUsageTemplate,
    },
};
