import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIButton } from '../button/button';
import { UIFlexDirective } from '../flex/flex.directive';
import { IconClose } from '../icons';
import { Placement, UIDialog } from './dialog';

@Component({
    selector: 'ui-dialog-example',
    standalone: true,
    imports: [CommonModule, UIDialog, UIButton, UIFlexDirective],
    template: `
        <ui-button label="Open Dialog" (click)="open = true"></ui-button>

        <ui-dialog [open]="open" (onClose)="open = false" placement="center">
            <div style="padding: var(--spacing-sizing-04)">
                <div
                    [ui-flex]="{ direction: 'row', justify: 'between' }"
                    style="margin-bottom: var(--spacing-sizing-04)">
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

        <h4>Contained Dialog (Right, no Scrim)</h4>
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
                    <div
                        [ui-flex]="{ align: 'baseline', justify: 'between' }"
                        style="margin-bottom: var(--spacing-sizing-04)">
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

        @for (placement of placements; track placement) {
            <h4>Dialog {{ placement }}</h4>
            <ui-button label="Open {{ placement }} Dialog" (click)="openPlacement[placement] = true"></ui-button>

            <ui-dialog
                [open]="openPlacement[placement]"
                (onClose)="openPlacement[placement] = false"
                [placement]="placement">
                <div style="padding: var(--spacing-sizing-04)">
                    <div
                        [ui-flex]="{ align: 'baseline', justify: 'between' }"
                        style="margin-bottom: var(--spacing-sizing-04)">
                        <h4>Dialog Title</h4>
                        <ui-button
                            label="Close"
                            variant="tertiary"
                            (click)="openPlacement[placement] = false"
                            [icon]="iconClose"
                            [iconOnly]="true" />
                    </div>
                    <p>This is the content of the {{ placement }} dialog.</p>
                    <ui-button
                        label="Cancel"
                        variant="secondary"
                        (click)="openPlacement[placement] = false"></ui-button>
                </div>
            </ui-dialog>
        }

        <h4>Dialog no scrim</h4>
        <ui-button label="Open Dialog No Scrim" (click)="openNoScrim = true"></ui-button>

        <ui-dialog [open]="openNoScrim" (onClose)="openNoScrim = false" placement="center" [showScrim]="false">
            <div style="padding: var(--spacing-sizing-04)">
                <div
                    [ui-flex]="{ align: 'baseline', justify: 'between' }"
                    style="margin-bottom: var(--spacing-sizing-04)">
                    <h4>Dialog Title</h4>
                    <ui-button
                        label="Close"
                        variant="tertiary"
                        (click)="openNoScrim = false"
                        [icon]="iconClose"
                        [iconOnly]="true" />
                </div>
                <p>This is the content of the dialog without a scrim.</p>
                <ui-button label="Cancel" variant="secondary" (click)="openNoScrim = false"></ui-button>
            </div>
        </ui-dialog>

        <h4>Dialog width full</h4>
        <ui-button label="Open Full Width Dialog" (click)="openWidthFull = true"></ui-button>

        <ui-dialog [open]="openWidthFull" (onClose)="openWidthFull = false" placement="center" [widthFull]="true">
            <div style="padding: var(--spacing-sizing-04)">
                <div
                    [ui-flex]="{ align: 'baseline', justify: 'between' }"
                    style="margin-bottom: var(--spacing-sizing-04)">
                    <h4>Dialog Title</h4>
                    <ui-button
                        label="Close"
                        variant="tertiary"
                        (click)="openWidthFull = false"
                        [icon]="iconClose"
                        [iconOnly]="true" />
                </div>
                <p>This is the content of the full width dialog.</p>
                <ui-button label="Cancel" variant="secondary" (click)="openWidthFull = false"></ui-button>
            </div>
        </ui-dialog>
    `,
})
export class UIDialogExample {
    open = false;
    openContained = false;
    openNoScrim = false;
    openWidthFull = false;
    openPlacement: Record<(typeof this.placements)[number], boolean> = {
        top: false,
        bottom: false,
        left: false,
        right: false,
    };
    placements: Exclude<Placement, 'center'>[] = ['top', 'bottom', 'left', 'right'];

    iconClose = IconClose;
}
