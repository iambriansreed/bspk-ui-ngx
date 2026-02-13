import { ComponentSettings } from '@shared/types';
import { AccordionProps } from './';

export const Accordion: ComponentSettings<AccordionProps> = {
    defaultValues: {
        singleOpen: true,
    },
    ngContent: {
        imports: ['UIAccordionSection'],
        template: `
    <ui-accordion-section title="Section 1">Section 1 content</ui-accordion-section>
    <ui-accordion-section title="Section 2">Section 2 content</ui-accordion-section>
    <ui-accordion-section title="Section 3">Section 3 content</ui-accordion-section>
    <ui-accordion-section title="Section 4">Section 4 content</ui-accordion-section>`,
    },
};
