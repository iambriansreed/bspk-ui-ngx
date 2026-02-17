import { CommonModule } from '@angular/common';
import { Component, computed, model } from '@angular/core';
import { IconCat, IconDog, IconIcecream, UIRadioGroup } from '../..';
import { BspkIcon } from '../../types/bspk-icon';
import { UIIcon } from './icon';

@Component({
    selector: 'ui-icon-example',
    standalone: true,
    imports: [CommonModule, UIIcon, UIRadioGroup],
    template: `
        <h4>Default</h4>
        <ui-icon [icon]="iconIcecream" />

        <h4>width = 40</h4>

        <ui-icon [icon]="iconIcecream" width="40" />

        <h4>Change icon</h4>
        <div>
            <ui-icon [icon]="iconCurrent()" [width]="iconWidth()" />
        </div>

        <div style="margin-top: 16px; width: 100px">
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

    readonly iconCurrent = computed<BspkIcon>(() => (this.iconName() === 'cat' ? this.iconCat : this.iconDog));
    readonly iconName = model<string | undefined>('cat');
    readonly iconWidth = model<string | undefined>('50px');
}
