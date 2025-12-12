import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIDialog } from './dialog';
import { UIButton } from '../button';

@Component({
    selector: 'ui-dialog-example',
    standalone: true,
    imports: [CommonModule, UIDialog, UIButton],
    template: `
        <h2>Dialog</h2>

        <ui-button label="Open Dialog" (click)="open = true"></ui-button>

        <ui-dialog [open]="open" (onClose)="open = false" header="Example dialog" description="This is a demo dialog">
            <div style="padding: 20px">
                <p>This is demo dialog content.</p>
                <ui-button label="Close" (click)="open = false"></ui-button>
            </div>
        </ui-dialog>
    `,
})
export class UIDialogExample {
    protected open = false;
}
