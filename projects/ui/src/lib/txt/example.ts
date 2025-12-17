import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UITxtDirective } from './txt.directive';

@Component({
    selector: 'ui-txt-example',
    standalone: true,
    imports: [CommonModule, UITxtDirective],
    template: `
        <h2>Txt Directive</h2>

        <div ui-txt="body-base">body-base</div>
        <div ui-txt="body-large">body-large</div>
        <div ui-txt="body-small">body-small</div>
        <div ui-txt="body-x-small">body-x-small</div>
        <div ui-txt="display-regular-large">display-regular-large</div>
        <div ui-txt="display-regular-medium">display-regular-medium</div>
        <div ui-txt="display-regular-small">display-regular-small</div>
        <div ui-txt="display-semibold-large">display-semibold-large</div>
        <div ui-txt="display-semibold-medium">display-semibold-medium</div>
        <div ui-txt="display-semibold-small">display-semibold-small</div>
        <div ui-txt="heading-h2">heading-h2</div>
        <div ui-txt="heading-h2">heading-h2</div>
        <div ui-txt="heading-h3">heading-h3</div>
        <div ui-txt="heading-h4">heading-h4</div>
        <div ui-txt="heading-h5">heading-h5</div>
        <div ui-txt="heading-h6">heading-h6</div>
        <div ui-txt="labels-base">labels-base</div>
        <div ui-txt="labels-large">labels-large</div>
        <div ui-txt="labels-small">labels-small</div>
        <div ui-txt="labels-x-small">labels-x-small</div>
        <div ui-txt="subheader-large">subheader-large</div>
        <div ui-txt="subheader-medium">subheader-medium</div>
        <div ui-txt="subheader-x-large">subheader-x-large</div>
        <div ui-txt="subheader-xx-large">subheader-xx-large</div>
        <div ui-txt="subheader-xxx-large">subheader-xxx-large</div>
    `,
})
export class UITxtExample {}
