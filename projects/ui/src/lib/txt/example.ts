import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UITxtDirective } from './txt.directive';

@Component({
    selector: 'ui-txt-example',
    standalone: true,
    imports: [CommonModule, UITxtDirective],
    template: `
        <h2>Txt Directive</h2>

        <div txt="body-base">body-base</div>
        <div txt="body-large">body-large</div>
        <div txt="body-small">body-small</div>
        <div txt="body-x-small">body-x-small</div>
        <div txt="display-regular-large">display-regular-large</div>
        <div txt="display-regular-medium">display-regular-medium</div>
        <div txt="display-regular-small">display-regular-small</div>
        <div txt="display-semibold-large">display-semibold-large</div>
        <div txt="display-semibold-medium">display-semibold-medium</div>
        <div txt="display-semibold-small">display-semibold-small</div>
        <div txt="heading-h2">heading-h2</div>
        <div txt="heading-h2">heading-h2</div>
        <div txt="heading-h3">heading-h3</div>
        <div txt="heading-h4">heading-h4</div>
        <div txt="heading-h5">heading-h5</div>
        <div txt="heading-h6">heading-h6</div>
        <div txt="labels-base">labels-base</div>
        <div txt="labels-large">labels-large</div>
        <div txt="labels-small">labels-small</div>
        <div txt="labels-x-small">labels-x-small</div>
        <div txt="subheader-large">subheader-large</div>
        <div txt="subheader-medium">subheader-medium</div>
        <div txt="subheader-x-large">subheader-x-large</div>
        <div txt="subheader-xx-large">subheader-xx-large</div>
        <div txt="subheader-xxx-large">subheader-xxx-large</div>
    `,
})
export class UITxtExample {}
