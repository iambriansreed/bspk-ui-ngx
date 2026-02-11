import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/send-snackbar';
import { IconBarn } from '../icons/barn';
import { IconBox } from '../icons/box';
import { IconBrail } from '../icons/brail';
import { IconCloud } from '../icons/cloud';
import { IconGTranslate } from '../icons/g-translate';
import { IconWarningFill } from '../icons/warning-fill';
import { UIButton } from './button';

@Component({
    selector: 'ui-button-example',
    standalone: true,
    imports: [CommonModule, UIButton],
    template: `
        <h4>Default</h4>
        <p>only click & the required label prop set</p>
        <ui-button (click)="handleClick('Default')" label="Default" />

        <h4>Primary</h4>
        <ui-button
            (onClick)="handleClick('Primary')"
            label="Example Label"
            size="large"
            variant="primary"
            [icon]="iconGTranslate" />

        <h4>Secondary</h4>
        <ui-button
            (onClick)="handleClick('Secondary')"
            label="Example Label"
            size="medium"
            variant="secondary"
            [icon]="iconBrail" />

        <h4>Tertiary</h4>
        <ui-button
            (onClick)="handleClick('Tertiary')"
            label="Example Label"
            size="small"
            variant="tertiary"
            [icon]="iconBarn" />

        <h4>Primary with Tooltip</h4>
        <ui-button
            (onClick)="handleClick('Primary with Tooltip')"
            label="Primary with Tooltip"
            size="large"
            [icon]="iconCloud"
            tooltip="Primary with Tooltip" />

        <h4>Destructive with Tooltip</h4>
        <ui-button
            (onClick)="handleClick('Destructive with Tooltip')"
            label="Destructive with Tooltip"
            [icon]="iconWarningFill"
            [destructive]="true"
            tooltip="Destructive with Tooltip" />

        <h4>Destructive iconOnly = true</h4>
        <ui-button
            (onClick)="handleClick('Destructive iconOnly = true')"
            label="Destructive test"
            [icon]="iconWarningFill"
            [iconOnly]="true"
            [destructive]="true" />

        <h4>Destructive + variant secondary</h4>
        <ui-button
            (onClick)="handleClick('Destructive, variant secondary')"
            label="Destructive with Tooltip"
            [icon]="iconWarningFill"
            [destructive]="true"
            variant="secondary" />

        <h4>Destructive + variant tertiary</h4>
        <ui-button
            (onClick)="handleClick('Destructive, variant tertiary')"
            label="Destructive with Tooltip"
            [icon]="iconWarningFill"
            [destructive]="true"
            variant="tertiary" />

        <h4>Disabled</h4>
        <ui-button
            (onClick)="handleClick('Disabled')"
            label="Disabled test"
            [icon]="iconWarningFill"
            [disabled]="true" />

        <h4>Disabled iconOnly = true</h4>
        <ui-button
            (onClick)="handleClick('Disabled iconOnly = true')"
            label="Destructive test"
            [icon]="iconWarningFill"
            [iconOnly]="true"
            [disabled]="true" />

        <h4>Disabled & destructive = true</h4>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (onClick)="handleClick('Disabled & Destructive')"
            label="Disabled & Destructive Test"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h4>Primary Disabled & destructive = true</h4>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (onClick)="handleClick('Primary Disabled & Destructive')"
            label="Disabled & Destructive Test"
            variant="primary"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h4>Secondary Disabled & destructive = true</h4>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (onClick)="handleClick('Secondary Disabled & Destructive')"
            label="Disabled & Destructive Test"
            variant="secondary"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h4>Tertiary Disabled & destructive = true</h4>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (onClick)="handleClick('Tertiary Disabled & Destructive')"
            label="Disabled & Destructive Test"
            variant="tertiary"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h4>width = fill</h4>
        <p>should visually see button fill the width of 500px parent width</p>
        <div style="width: 500px">
            <ui-button (onClick)="handleClick('width = fill')" label="Example Label" [icon]="iconBox" width="fill" />
        </div>

        <h4>Events</h4>
        <ui-button
            label="Event Button"
            (onClick)="handleClick('Events')"
            (onBlur)="log('Blur')"
            (onFocus)="log('Focus')"
            (onMouseLeave)="log('Mouse Leave')"
            (onMouseEnter)="log('Mouse Enter')" />

        <h4>Custom Content</h4>
        <ui-button
            label="Custom can have label now, Custom Content Example"
            (onClick)="handleClick('Custom Content')"
            style="padding: 0 var(--spacing-sizing-03)">
            <svg
                width="16"
                focusable="false"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
            Custom Content Example</ui-button
        >

        <h4>Custom Icon</h4>
        <ui-button
            (onClick)="handleClick('Custom Icon')"
            tooltip="hello world example"
            label="Custom Icon"
            variant="secondary">
            <svg
                focusable="false"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </svg>
        </ui-button>

        <h4>Test aria-controls, aria-expanded, aria-haspopup</h4>
        <ui-button
            label="Aria Controls"
            ariaControls="test-controls"
            [ariaExpanded]="true"
            ariaHaspopup="true"
            (onClick)="handleClick('Aria Controls')" />

        <div
            id="test-controls"
            aria-label="Example controlled content"
            role="note"
            tabindex="-1"
            style="margin-top: 8px; border: 1px solid #ccc; padding: 8px; background: #fafafa;">
            The id of this div matches the aria-controls attribute of the button above. This is the content controlled
            by the "Aria Controls" button. It should be announced by screen readers when the button is clicked, due to
            the aria-controls, aria-expanded, and aria-haspopup attributes.
        </div>

        <h4>Test owner, class, and style</h4>
        <ui-button
            label="Owner/Class/Style"
            owner="test-owner"
            class="custom-class"
            style="backgroundColor: '#e0e0e0', color: '#333'"
            (onClick)="handleClick('Owner/Class/Style')" />

        <h4>Test type=submit</h4>
        <form (submit)="handleClick('Form Submit')">
            <ui-button label="Submit Button" type="submit" (onClick)="handleClick('Submit Button')" />
        </form>

        <h4>Test type=reset</h4>
        <form (reset)="handleClick('Form Reset')">
            <ui-button label="Reset Button" type="reset" (onClick)="handleClick('Reset Button')" />
        </form>
    `,
})
export class UIButtonExample {
    protected readonly iconGTranslate = IconGTranslate;
    protected readonly iconBrail = IconBrail;
    protected readonly iconBarn = IconBarn;
    protected readonly iconCloud = IconCloud;
    protected readonly iconWarningFill = IconWarningFill;
    protected readonly iconBox = IconBox;

    log(msg: string) {
        sendSnackbar(msg);
    }

    protected handleClick(name: string): void {
        sendSnackbar(`${name} Button clicked!`);
    }
}
