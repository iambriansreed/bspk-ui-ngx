import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIAvatarGroup } from './avatar-group';

@Component({
    selector: 'ui-avatar-group-example',
    standalone: true,
    imports: [CommonModule, UIAvatarGroup],
    template: `
        <h2>Avatar Group Examples</h2>

        <h3>Default (stacked, small, max=5)</h3>
        <ui-avatar-group [items]="avatars"></ui-avatar-group>

        <h3>Spread variant, medium size, max=3</h3>
        <ui-avatar-group [items]="avatars" [variant]="'spread'" [size]="'medium'" [max]="3"></ui-avatar-group>

        <h3>Stacked, x-large, max=4, custom style</h3>
        <ui-avatar-group
            [items]="avatars"
            [variant]="'stacked'"
            [size]="'x-large'"
            [max]="4"
            [style]="{ marginLeft: '2rem', border: '2px solid #eee', padding: '1rem' }"></ui-avatar-group>

        <h3>Only 2 avatars, max=5</h3>
        <ui-avatar-group [items]="avatars.slice(0, 2)" [max]="5"></ui-avatar-group>

        <h3>All avatars, max=2 (shows overflow)</h3>
        <ui-avatar-group [items]="avatars" [max]="2"></ui-avatar-group>
    `,
})
export class UIAvatarGroupExample {
    avatars = [
        { name: 'Fezzik', image: '/avatar-01.png' },
        { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
        { name: 'Miracle Max', initials: 'MM', color: 'green' },
        { name: 'Princess Buttercup', showIcon: true },
        { name: 'Westley', initials: 'W', color: 'purple' },
        { name: 'Vincent', initials: 'V', color: 'orange' },
    ];
}
