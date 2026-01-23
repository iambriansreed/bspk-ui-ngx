import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIExample } from '../../demo';
import { UIAccordion } from './accordion';

@Component({
    selector: 'ui-accordion-example',
    standalone: true,
    imports: [CommonModule, UIAccordion, UIExample],
    template: `
        <h4>Default (multiple open)</h4>

        <ui-example>
            <ui-accordion
                [singleOpen]="false"
                [items]="[
                    { title: 'Foo', children: 'Foo Children' },
                    { title: 'Bar', children: 'Bar Children' },
                    { title: 'Car', children: 'Car Children' },
                ]"></ui-accordion>
        </ui-example>

        <h3>Single Open</h3>

        <ui-accordion
            [singleOpen]="true"
            [items]="[
                { title: 'Foo', children: 'Foo Children' },
                { title: 'Bar', children: 'Bar Children' },
                { title: 'Car', children: 'Car Children' },
            ]"></ui-accordion>

        <h3>With No Items (hidden)</h3>

        <ui-accordion [items]="[]"></ui-accordion>
    `,
})
export class UIAccordionExample {}
