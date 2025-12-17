import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { sendSnackbar } from '../../utils/sendSnackbar';
import { UIButton } from '../button';
import { UIScrim } from './scrim';

@Component({
    selector: 'ui-scrim-example',
    imports: [CommonModule, UIScrim, UIButton],
    template: `
        <ui-button [label]="open ? 'Close scrim' : 'Open scrim'" (click)="openScrim()" />

        @if (open) {
            <ui-scrim [visible]="true" (click)="onClickScrim()"> Just a scrim example content. </ui-scrim>
        }
    `,
})
export class UIScrimExample {
    open = false;

    constructor(private ngZone: NgZone) {}

    openScrim() {
        this.open = true;
    }

    onClickScrim() {
        this.open = false;
        sendSnackbar('Scrim clicked - closed scrim');
    }
}
