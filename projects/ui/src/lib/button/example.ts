import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '../../utils/sendSnackbar';
import { IconAdd } from '../icons/add';
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
    imports: [CommonModule, UIButton, IconAdd],
    template: `
        <h2>Button</h2>

        <h3>Default</h3>
        <p>only click & the required label prop set</p>
        <ui-button (click)="handleClick('Default')" label="Default" />

        <h3>Primary</h3>
        <ui-button
            (click)="handleClick('Primary')"
            label="Example Primary"
            size="large"
            variant="primary"
            [icon]="iconGTranslate" />

        <h3>Secondary</h3>
        <ui-button
            (click)="handleClick('Secondary')"
            label="Example Secondary"
            size="medium"
            variant="secondary"
            [icon]="iconBrail" />

        <h3>Tertiary</h3>
        <ui-button
            (click)="handleClick('Tertiary')"
            label="Example Tertiary"
            size="small"
            variant="tertiary"
            [icon]="iconBarn" />

        <h3>Primary with Tooltip</h3>
        <ui-button
            (click)="handleClick('Primary with Tooltip')"
            label="Example Primary with Tooltip"
            size="large"
            [icon]="iconCloud"
            tooltip="Primary with Tooltip" />

        <h3>Destructive with Tooltip</h3>
        <ui-button
            (click)="handleClick('Destructive with Tooltip')"
            label="Destructive with Tooltip"
            [icon]="iconWarningFill"
            [destructive]="true"
            tooltip="Destructive with Tooltip" />

        <h3>Destructive iconOnly = true</h3>

        <ui-button
            (click)="handleClick('Destructive iconOnly = true')"
            label="Destructive iconOnly = true"
            [icon]="iconWarningFill"
            [iconOnly]="true"
            [destructive]="true" />

        <h3>Disabled</h3>
        <ui-button (click)="handleClick('Disabled')" label="Disabled test" [icon]="iconWarningFill" [disabled]="true" />

        <h3>Disabled iconOnly = true</h3>
        <ui-button
            (click)="handleClick('Disabled iconOnly = true')"
            label="Disabled iconOnly = true"
            [icon]="iconWarningFill"
            [iconOnly]="true"
            [disabled]="true" />

        <h3>Disabled & destructive = true</h3>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (click)="handleClick('Disabled & Destructive')"
            label="Disabled & Destructive Test"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h3>Primary Disabled & destructive = true</h3>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (click)="handleClick('Primary Disabled & Destructive')"
            label="Primary Disabled & Destructive Test"
            variant="primary"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h3>Secondary Disabled & destructive = true</h3>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (click)="handleClick('Secondary Disabled & Destructive')"
            label="Disabled & Destructive Test"
            variant="secondary"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h3>Tertiary Disabled & destructive = true</h3>
        <p>should visually see disabled and not destructive</p>
        <ui-button
            (click)="handleClick('Tertiary Disabled & Destructive')"
            label="Disabled & Destructive Test"
            variant="tertiary"
            [icon]="iconWarningFill"
            [disabled]="true"
            [destructive]="true" />

        <h3>width = fill</h3>
        <p>should visually see button fill the width of 500px parent width</p>
        <div style="width: 500px">
            <ui-button (click)="handleClick('Example Label')" label="Example Label" [icon]="iconBox" width="fill" />
        </div>

        <h3>Custom Content</h3>
        <ui-button label="" (click)="handleClick('Custom Content')"
            ><icon-add width="24" />Custom Content Example</ui-button
        >

        <h3>Custom Icon</h3>
        <ui-button
            (click)="handleClick('Custom Icon')"
            tooltip="Hello world"
            label="hello world example"
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
    `,
})
export class UIButtonExample {
    protected readonly iconGTranslate = IconGTranslate;
    protected readonly iconBrail = IconBrail;
    protected readonly iconBarn = IconBarn;
    protected readonly iconCloud = IconCloud;
    protected readonly iconWarningFill = IconWarningFill;
    protected readonly iconBox = IconBox;

    protected handleClick(name: string): void {
        sendSnackbar(`${name} Button clicked!`);
    }
}
