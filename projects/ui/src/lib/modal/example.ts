import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIButton } from '../button/button';
import { UIListItem } from '../list-item';
import { UIRadio } from '../radio';
import { UIModal } from './modal';

@Component({
    selector: 'ui-modal-example',
    standalone: true,
    imports: [CommonModule, UIModal, UIButton, UIListItem, UIRadio],
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

        <h3>Scrollable Content</h3>
        <ui-button label="Open Modal" (onClick)="openScrolling = true"></ui-button>
        <ui-modal
            [open]="openScrolling"
            (onClose)="openScrolling = false"
            header="Example header"
            description="Example description"
            [callToAction]="cta"
            [cancelButton]="true">
            <div style="display: flex; flex-direction: column">
                <p>
                    This is sample content used to demonstrate a scrollable modal. It contains plain English sentences
                    that are easy to read and spell. The purpose is to provide enough text to force overflow so the
                    container can scroll. The modal opens with a button, closes with the close control, and traps focus
                    while it is active. When the text is longer than the view, a scrollbar appears and the header stays
                    visible.
                </p>
                @for (num of arr; track $index) {
                    <ui-list-item as="label" [label]="'list item ' + ($index + 1)">
                        <span data-trailing><ui-radio name="x" value="{{ $index + 1 }}" /></span>
                    </ui-list-item>
                }
            </div>
        </ui-modal>
    `,
})
export class UIModalExample {
    open = false;
    openVertical = false;
    openScrolling = false;

    arr = new Array(50);

    cta = {
        label: 'Confirm',
        onClick: () => (this.open = false),
        destructive: false,
    };
}
