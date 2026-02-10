import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UIAvatar, UITag } from '../..';
import { UIExample } from '../../demo';
import { IconCat } from '../icons/cat';
import { UIAccordion, UIAccordionSection } from './';

@Component({
    selector: 'ui-accordion-example',
    standalone: true,
    imports: [CommonModule, UIAccordion, UIExample, UIAccordionSection, IconCat, UIAvatar, UITag],
    template: `
        <h4>Default (multiple open)</h4>
        <ui-example>
            <ui-accordion [singleOpen]="false">
                <ui-accordion-section title="Felines" subtitle="With Leading Icon">
                    <span data-leading><icon-cat width="24" /></span>
                    <div>Content about cats and other felines.</div>
                </ui-accordion-section>

                <ui-accordion-section title="Dogs" subtitle="With Trailing Tag">
                    <span data-trailing><ui-tag label="Dogs" color="orange" /></span>
                    <p>Dog Children</p>
                </ui-accordion-section>

                <ui-accordion-section title="Reptiles" subtitle="Disabled" [disabled]="true">
                    Reptile Children
                </ui-accordion-section>
            </ui-accordion>
        </ui-example>

        <h4>Single Open</h4>
        <ui-example>
            <ui-accordion [singleOpen]="true">
                <ui-accordion-section title="Alpha" subtitle="With Leading Avatar">
                    <span data-leading> <ui-avatar name="Alice Anderson" size="small" /></span>
                    Alpha Children</ui-accordion-section
                >
                <ui-accordion-section title="Bravo" subtitle="With Leading Avatar">
                    <span data-leading> <ui-avatar name="Bob Brown" size="small" /></span>
                    Bravo Children</ui-accordion-section
                >
                <ui-accordion-section title="Charlie" subtitle="With Leading Avatar">
                    <span data-leading> <ui-avatar name="Charlie Clark" size="small" /></span>
                    Charlie Children</ui-accordion-section
                >
                <ui-accordion-section title="Delta" subtitle="With Leading string" leading="DD">
                    Delta Children</ui-accordion-section
                >
                <ui-accordion-section title="Echo" subtitle="With Trailing string" trailing="echo">
                    Echo Children</ui-accordion-section
                >
            </ui-accordion>
        </ui-example>

        <h4>section props: id, isOpen, disabled, title, subtitle, leading, trailing</h4>
        <ui-example>
            <ui-accordion>
                <ui-accordion-section
                    id="open-section"
                    title="Open Section"
                    subtitle="This section is open by default"
                    leading="Leading"
                    trailing="Trailing"
                    [isOpen]="true">
                    Open Children
                </ui-accordion-section>

                <ui-accordion-section title="Disabled Section" subtitle="This section is disabled" [disabled]="true">
                    Disabled Children
                </ui-accordion-section>

                <ui-accordion-section title="Regular Section" subtitle="This section is closed by default">
                    Regular Children
                </ui-accordion-section>
            </ui-accordion>
        </ui-example>

        <h4>With No Items (hidden)</h4>
        <ui-example>
            <ui-accordion></ui-accordion>
        </ui-example>
    `,
})
export class UIAccordionExample {}
