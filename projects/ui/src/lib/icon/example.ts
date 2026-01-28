import { CommonModule } from '@angular/common';
import { Component, effect, model } from '@angular/core';
import { IconCat, IconDog, IconIcecream, UIRadioGroup } from '../..';
import { UIIcon } from './icon';

@Component({
    selector: 'ui-icon-example',
    standalone: true,
    imports: [CommonModule, UIIcon, UIRadioGroup],
    template: `
        <h4>Using prop width = 24</h4>
        <div>
            <ui-icon [icon]="iconIcecream" width="24" />
        </div>

        <h4>Not using width prop</h4>
        <p>Parent div has a width of 50px</p>
        <div style="width: 50px">
            <ui-icon [icon]="iconIcecream" />
        </div>

        <h4>Change icon</h4>
        <div>
            <ui-icon [icon]="iconCurrent" [width]="iconWidth()" />
        </div>

        <div style="margin-top: 16px; width: 100px">
            {{ iconName() }}
            <ui-radio-group
                name="select-icon-name"
                label="Select Icon"
                (valueChange)="iconName.set($event)"
                [value]="iconName()"
                [options]="[
                    { label: 'Cat', value: 'cat' },
                    { label: 'Dog', value: 'dog' },
                ]" />
        </div>

        <div style="margin-top: 16px; width: 100px">
            <ui-radio-group
                name="select-icon-width"
                label="Select Icon Width"
                (valueChange)="iconWidth.set($event)"
                [value]="iconWidth()"
                [options]="[
                    { label: '50px', value: '50px' },
                    { label: '100px', value: '100px' },
                ]" />
        </div>
    `,
})
export class UIIconExample {
    iconIcecream = IconIcecream;
    iconCat = IconCat;
    iconDog = IconDog;

    iconCurrent = this.iconCat;
    readonly iconName = model('cat');
    readonly iconWidth = model('50px');

    constructor() {
        effect(() => {
            this.iconCurrent = this.iconName() === 'cat' ? this.iconCat : this.iconDog;
        });
    }
}
