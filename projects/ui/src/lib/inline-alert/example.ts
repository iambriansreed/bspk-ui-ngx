import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconAdd } from '../icons/add';
import { UIInlineAlert } from './inline-alert';

@Component({
    selector: 'ui-badge-example',
    standalone: true,
    imports: [CommonModule, UIInlineAlert],
    template: `
        <h2>InlineAlert</h2>
        <h3>Informational</h3>
        <ui-inline-alert variant="informational"><p>Informational alert content</p></ui-inline-alert>
        <h3>Success</h3>
        <ui-inline-alert variant="success"><p>Success alert content</p></ui-inline-alert>
        <h3>Error</h3>
        <ui-inline-alert variant="error"><p>Error alert content</p></ui-inline-alert>
        <h3>Warning</h3>
        <ui-inline-alert variant="warning"><p>Warning alert content</p></ui-inline-alert>
        <h3>Elevated</h3>
        <ui-inline-alert variant="informational"><p>Informational alert content</p></ui-inline-alert>
    `,
})
export class UIInlineAlertExample {
    protected readonly iconAdd = IconAdd;
}
