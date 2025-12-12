import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UICard } from './card';

@Component({
    selector: 'ui-card-example',
    standalone: true,
    imports: [CommonModule, UICard],
    template: `
        <h2>Card</h2>

        <h3>Default</h3>

        <div style="width: 300px">
            <ui-card>
                <p>Card works! <br />no props set</p>
            </ui-card>
        </div>

        <h3>Outlined Variant</h3>

        <div style="width: 300px">
            <ui-card variant="outlined">
                <p>Card works! <br />(variant="outlined")</p>
            </ui-card>
        </div>

        <h3>Elevated Variant</h3>

        <div style="width: 300px">
            <ui-card variant="elevated">
                <p>Card works! <br />(variant="elevated")</p>
            </ui-card>
        </div>
    `,
})
export class UICardExample {}
