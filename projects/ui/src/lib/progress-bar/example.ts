import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIProgressBar } from './progress-bar';

@Component({
    selector: 'ui-progress-bar-example',
    imports: [CommonModule, UIProgressBar],
    template: `
        <h4>Large</h4>
        <ui-progress-bar label="Large" size="large" [completion]="30" />
        <h4>Small</h4>
        <ui-progress-bar label="Small" size="small" [completion]="30" />
        <h4>Left Align</h4>
        <ui-progress-bar label="Left Align" align="left" [completion]="30" />
        <h4>Success Color</h4>
        <ui-progress-bar label="Success Color" [successColor]="true" [completion]="100" />
    `,
})
export class UIProgressBarExample {}
