import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIButton } from '../button/button';
import { UIModal } from './modal';

@Component({
    selector: 'ui-modal-example',
    standalone: true,
    imports: [CommonModule, UIModal, UIButton],
    template: `
        <h2>Modal</h2>

        <ui-button label="Open Modal" (onClick)="open = true"></ui-button>

        <ui-modal
            [open]="open"
            (onClose)="open = false"
            header="Example header"
            description="Example description"
            [callToAction]="cta"
            [cancelButton]="true">
            Example Modal
        </ui-modal>

        <h3>Vertical Buttons</h3>
        <ui-button label="Open Vertical Modal" (onClick)="openVertical = true"></ui-button>
        <ui-modal
            [open]="openVertical"
            (onClose)="openVertical = false"
            header="Example header"
            description="Example description"
            [callToAction]="cta"
            [cancelButton]="'Back'"
            buttonFormat="vertical">
            Vertical layout content
        </ui-modal>
    `,
})
export class UIModalExample {
    open = false;
    openVertical = false;

    cta = {
        label: 'Confirm',
        onClick: () => (this.open = false),
        destructive: false,
    };
}
