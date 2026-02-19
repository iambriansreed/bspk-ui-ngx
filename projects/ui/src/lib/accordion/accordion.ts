import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, contentChildren, input } from '@angular/core';
import { AsSignal } from '../../types/common';
import { UIAccordionSection } from './section';

export interface AccordionProps {
    /**
     * If true only one accordion section can be opened at a time
     *
     * @default true
     */
    singleOpen?: boolean;
}

/**
 * A vertical stack of collapsible panels or that allows customers to expand or collapse each panel individually to
 * reveal or hide their content.
 *
 * ```html
 * <div style="width: 300px">
 *     <ui-accordion [singleOpen]="false">
 *         <ui-accordion-section title="Alpha"> Alpha Children </ui-accordion-section>
 *         <ui-accordion-section title="Beta"> Beta Children </ui-accordion-section>
 *         <ui-accordion-section title="Gamma"> Gamma Children </ui-accordion-section>
 *     </ui-accordion>
 *     <div></div>
 * </div>
 * ```
 *
 * @name Accordion
 * @phase Dev
 */
@Component({
    selector: 'ui-accordion',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-content></ng-content>`,
    styleUrl: './accordion.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'accordion',
    },
})
export class UIAccordion implements OnInit, AsSignal<AccordionProps> {
    readonly singleOpen = input<AccordionProps['singleOpen']>(true);

    readonly items = contentChildren(UIAccordionSection, { descendants: true });

    ngOnInit() {
        this.items().forEach((item) => {
            item.toggleOpen.subscribe((itemId: string) => this.toggleOpen(itemId));
        });
    }

    toggleOpen(itemId: string) {
        const item = this.items().find((i) => i.id() === itemId)!;

        const isOpen = item.isOpen();

        if (this.singleOpen())
            return this.items().forEach((i) => {
                i.isOpen.set(i.id() !== itemId ? false : !isOpen);
            });

        item.isOpen.set(!isOpen);
    }
}
