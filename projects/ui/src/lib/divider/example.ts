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

        <h4>Horizontal light (default)</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>Horizontal light (default), padding = false</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [padding]="false" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>Horizontal, thickness = heavy, padding = false, inset = 2</h4>
        <ui-example width="320px" direction="column">
            <ui-list-item [label]="'Above'"></ui-list-item>
            <ui-divider [thickness]="'heavy'" [inset]="2" [padding]="false" />
            <ui-list-item [label]="'Below'"></ui-list-item>
        </ui-example>

        <h4>Vertical, inset = 2</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [inset]="2" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>

        <h4>Vertical, thickness = heavy, inset = 2</h4>
        <ui-example>
            <ui-list-item [label]="'Left'"></ui-list-item>
            <ui-divider [orientation]="'vertical'" [thickness]="'heavy'" [inset]="2" />
            <ui-list-item [label]="'Right'" style="background: blue;"></ui-list-item>
        </ui-example>
    `,
})
export class UIDividerExample {}
