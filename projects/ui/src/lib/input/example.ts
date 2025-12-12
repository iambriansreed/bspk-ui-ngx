import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIInput } from './input';

@Component({
    selector: 'ui-input-example',
    standalone: true,
    imports: [CommonModule, UIInput],
    template: `
        <h2>Input</h2>

        <h3>Default</h3>
        <ui-input label="Input Label"></ui-input>

        <h3>Disabled</h3>
        <ui-input label="Input Label" [disabled]="true"></ui-input>

        <h3>Invalid</h3>
        <ui-input label="Input Label" [invalid]="true"></ui-input>

        <h3>Required</h3>
        <ui-input label="Input Label" [required]="true"></ui-input>

        <h3>Read Only</h3>
        <ui-input label="Input Label" [readOnly]="true"></ui-input>

        <h3>showClearButton = true</h3>
        <ui-input label="Input Label" [showClearButton]="true"></ui-input>

        <h3>showClearButton = false</h3>
        <ui-input label="Input Label" [showClearButton]="false"></ui-input>

        <h3>Placeholder</h3>
        <ui-input label="Input Label" placeholder="I am placeholder copy"></ui-input>

        <h3>size = small</h3>
        <ui-input label="Input Label" size="small"></ui-input>

        <h3>size = medium</h3>
        <ui-input label="Input Label" size="medium"></ui-input>

        <h3>size = large</h3>
        <ui-input label="Input Label" size="large"></ui-input>

        <h3>name</h3>
        <ui-input label="Input Label" name="I am an example name"></ui-input>

        <h3>value</h3>
        <ui-input label="Input Label" value="I am an example value"></ui-input>

        <h3>ariaLabel</h3>
        <ui-input label="Input Label" ariaLabel="Input Label + aria-label"></ui-input>

        <h3>autoComplete</h3>
        <ui-input label="Input Label" autoComplete="on"></ui-input>

        <h3>id</h3>
        <ui-input label="Input Label" id="hello, I am an id"></ui-input>

        <h3>owner</h3>
        <ui-input label="Input Label" owner="and the owner is..."></ui-input>

        <h3>type: text</h3>
        <ui-input label="Input Label" type="text"></ui-input>

        <h3>type: number</h3>
        <ui-input label="Input Label" type="number"></ui-input>

        <h3>type: password</h3>
        <ui-input label="Input Label" type="password"></ui-input>

        <h3>leading</h3>
        <ui-input label="Input Label" leading="$"></ui-input>

        <h3>trailing</h3>
        <ui-input label="Input Label" trailing="%"></ui-input>
    `,
})
export class UIInputExample {}
