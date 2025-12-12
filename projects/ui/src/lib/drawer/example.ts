import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIDrawer } from './drawer';
import { UIButton } from '../button';

@Component({
    selector: 'ui-drawer-example',
    standalone: true,
    imports: [CommonModule, UIDrawer, UIButton],
    template: `
        <h2>Drawer</h2>

        <ui-button label="Open Drawer" (click)="open = true"></ui-button>

        <ui-drawer [open]="open" (onClose)="open = false" header="Example drawer" description="This is a demo drawer">
            <div style="padding: 20px; width: 320px">
                <p>This is demo drawer content.</p>
            </div>
        </ui-drawer>
    `,
})
export class UIDrawerExample {
    protected open = false;
}
