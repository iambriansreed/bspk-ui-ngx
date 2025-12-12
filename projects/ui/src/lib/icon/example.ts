import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIIcon } from './icon';
import { IconIcecream } from '../icons/icecream';

@Component({
    selector: 'ui-icon-example',
    standalone: true,
    imports: [CommonModule, UIIcon],
    template: `
        <h2>Icon</h2>

        <h3>Using prop width = 24</h3>
        <div>
            <ui-icon [icon]="iconIcecream" width="24"> </ui-icon>
        </div>

        <h3>Not using width prop</h3>
        <p>Parent div has a width of 50px</p>
        <div style="width: 50px">
            <ui-icon [icon]="iconIcecream"> </ui-icon>
        </div>
    `,
})
export class UIIconExample {
    protected readonly iconIcecream = IconIcecream;
}
