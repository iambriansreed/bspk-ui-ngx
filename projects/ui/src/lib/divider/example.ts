import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIExample } from '../../demo';
import { UIListItem } from '../list-item/list-item';
import { UIDivider } from './divider';

@Component({
    selector: 'ui-divider-example',
    standalone: true,
    imports: [CommonModule, UIDivider, UIListItem, UIExample],
    template: `
        <h3>Divider</h3>

        <h4>Default</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>orientation = horizontal (default), thickness = light (default), padding = false</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider orientation="horizontal" [padding]="false" [thickness]="'light'" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>thickness = heavy, padding = false</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [thickness]="'heavy'" [padding]="false" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>inset = 4</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [inset]="4" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>thickness = heavy, inset = 4</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [inset]="4" [thickness]="'heavy'" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>padding = false, inset = 6</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [inset]="6" [padding]="false" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>thickness = heavy, padding = false, inset = 2</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [thickness]="'heavy'" [inset]="2" [padding]="false" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, thickness = heavy</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [thickness]="'heavy'" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, padding = false</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [padding]="false" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, thickness = heavy, padding = false</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [padding]="false" [thickness]="'heavy'" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, padding = false, inset = 4</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [padding]="false" [inset]="4" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, thickness = heavy, padding = false, inset = 4</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [padding]="false" [thickness]="'heavy'" [inset]="4" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, inset = 2</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [inset]="2" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>orientation = vertical, thickness = heavy, inset = 2</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [thickness]="'heavy'" [inset]="2" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>
    `,
})
export class UIDividerExample {}
