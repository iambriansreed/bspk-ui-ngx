import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIButton } from '../button/button';
import { UIFlexDirective } from '../flex/flex.directive';
import { IconClose } from '../icons';
import { UIDialog } from './dialog';

@Component({
    selector: 'ui-dialog-example',
    standalone: true,
    imports: [CommonModule, UIDialog, UIButton, UIFlexDirective],
    template: `
        <h2>Dialog</h2>

        <ui-button label="Open Dialog" (click)="open = true"></ui-button>

        <ui-dialog [open]="open" (onClose)="open = false" placement="center">
            <div style="padding: var(--spacing-sizing-04)">
                <div ui-flex direction="row" justify="between" style="margin-bottom: var(--spacing-sizing-04)">
                    <h4>Dialog Title</h4>
                    <ui-button
                        label="Close"
                        variant="tertiary"
                        (click)="open = false"
                        [icon]="iconClose"
                        [iconOnly]="true" />
                </div>
                <p>This is the content of the dialog.</p>
                <ui-button label="Cancel" variant="secondary" (click)="open = false"></ui-button>
            </div>
        </ui-dialog>

        <h3>Contained Dialog (Right, no Scrim)</h3>
        <div
            #container
            style="border: 1px solid var(--stroke-neutral-base); padding: var(--spacing-sizing-04); min-height: 200px; position: relative; overflow: hidden;">
            <ui-button label="Open Contained" (click)="openContained = true"></ui-button>
            <ui-dialog
                [open]="openContained"
                (onClose)="openContained = false"
                [showScrim]="false"
                [container]="container"
                placement="right">
                <div style="padding: var(--spacing-sizing-04)">
                    <div ui-flex align="baseline" justify="between" style="margin-bottom: var(--spacing-sizing-04)">
                        <h4>Contained</h4>
                        <ui-button
                            label="Close"
                            variant="tertiary"
                            (click)="openContained = false"
                            [icon]="iconClose"
                            [iconOnly]="true" />
                    </div>
                    <p>Hello, I am a contained dialog!</p>
                </div>
            </ui-dialog>
        </div>
    `,
})
export class UIDialogExample {
    open = false;
    openContained = false;
    iconClose = IconClose;
}
