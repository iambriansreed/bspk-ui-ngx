import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { sendSnackbar } from '@ui/utils/send-snackbar';
import { UIAvatar } from './avatar';

@Component({
    selector: 'ui-avatar-example',
    standalone: true,
    imports: [CommonModule, UIAvatar],
    template: `
        <h4>Default</h4>
        <ui-avatar name="Default Example" />
        <h4>Basic Usage with color</h4>
        <ui-avatar color="blue" initials="JD" name="John Doe" size="xxxxx-large" />
        <ui-avatar color="teal" initials="KA" name="Kate Anders" size="xxxxx-large" />
        <ui-avatar color="green" initials="AB" name="Ali Bogs" size="xxxx-large" />
        <ui-avatar color="lime" initials="BH" name="Bea Hopkins" size="xxxx-large" />
        <ui-avatar color="yellow" initials="TM" name="Tim Meadows" size="xxx-large" />
        <ui-avatar color="orange" name="Andre Giant" size="xxx-large" />
        <ui-avatar color="red" name="Megan Jetson" size="xx-large" />
        <ui-avatar color="pink" name="Tom South" size="xx-large" />
        <ui-avatar color="magenta" name="Cal North" size="x-large" />
        <ui-avatar color="purple" name="Dan West" size="large" />
        <ui-avatar color="grey" name="Kel East" size="medium" />
        <ui-avatar color="primary" name="Sasha Lee" size="small" />
        <ui-avatar color="secondary" name="Nan Polo" size="x-small" />

        <h4>[showIcon]="false" with color</h4>
        <ui-avatar color="blue" [showIcon]="false" name="John Doe" size="xxxxx-large" />
        <ui-avatar color="teal" [showIcon]="false" name="Kate Anders" size="xxxxx-large" />
        <ui-avatar color="green" [showIcon]="false" name="Ali Bogs" size="xxxx-large" />
        <ui-avatar color="lime" [showIcon]="false" name="Bea Hopkins" size="xxxx-large" />
        <ui-avatar color="yellow" [showIcon]="false" name="Tim Meadows" size="xxx-large" />
        <ui-avatar color="orange" [showIcon]="false" name="Andre Giant" size="xxx-large" />
        <ui-avatar color="red" [showIcon]="false" name="Megan Jetson" size="xx-large" />
        <ui-avatar color="pink" [showIcon]="false" name="Tom South" size="xx-large" />
        <ui-avatar color="magenta" [showIcon]="false" name="Cal North" size="x-large" />
        <ui-avatar color="purple" [showIcon]="false" name="Dan West" size="large" />
        <ui-avatar color="grey" [showIcon]="false" name="Kel East" size="medium" />
        <ui-avatar color="primary" [showIcon]="false" name="Sasha Lee" size="small" />
        <ui-avatar color="secondary" [showIcon]="false" name="Nan Polo" size="x-small" />

        <h4>with image</h4>
        <ui-avatar image="./avatar-01.png" name="Tim Meadows" size="xxxxx-large" />
        <ui-avatar image="./avatar-02.png" name="Andre Giant" size="xxxx-large" />
        <ui-avatar image="./avatar-03.png" name="Megan Jetson" size="xxx-large" />
        <ui-avatar image="./avatar-04.png" name="Tom South" size="xx-large" />
        <ui-avatar image="./avatar-05.png" name="Cal North" size="x-large" />
        <ui-avatar image="./avatar-06.png" name="Dan West" size="large" />
        <ui-avatar image="./avatar-07.png" name="Kel East" size="medium" />
        <ui-avatar image="./avatar-08.png" name="Sasha Lee" size="small" />
        <ui-avatar image="./avatar-09.png" name="Nan Polo" size="x-small" />

        <h4>with different initials and [showIcon]="false"</h4>
        <ui-avatar initials="MM" name="Tim Meadows" [showIcon]="false" size="xxxxx-large" />

        <h4>[hideTooltip]="true"</h4>
        <ui-avatar initials="TM" name="Tim Meadows" [hideTooltip]="true" size="xxxxx-large" />

        <h4>onClick</h4>
        <p>when inspecting the element role should be button, not img</p>
        <ui-avatar name="Jane Smith" (onClick)="handleClick()" />

        <h4>onClick, [disabled]="true"</h4>
        <ui-avatar name="Andre Giant" (onClick)="handleClick()" [disabled]="true" />

        <h4>with click prop set</h4>
        <p>when inspecting the element role should be button, not img</p>
        <ui-avatar name="Jane Smith" size="xxxxx-large" (click)="handleClick()" />

        <h4>with click prop set, disabled = true</h4>
        <p>when inspecting the element role should be button, not img</p>
        <ui-avatar name="Jane Smith" size="xxxxx-large" (click)="handleClick()" [disabled]="true" />
    `,
})
export class UIAvatarExample {
    protected handleClick(): void {
        sendSnackbar('Avatar clicked');
    }
}
