import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewEncapsulation, computed, input, model } from '@angular/core';
import { uniqueId } from '../../utils/random';
import { IconKeyboardArrowDown } from '../icons/keyboard-arrow-down';
import { IconKeyboardArrowUp } from '../icons/keyboard-arrow-up';

export interface AccordionSection {
    /**
     * The content of the accordion.
     *
     * @required
     */
    children?: TemplateRef<any> | string;
    /**
     * The title of the accordion.
     *
     * @required
     */
    title: string;
    /** The subtitle of the accordion. */
    subtitle?: string;
    /** The leading element to display in the accordion header. */

    leading?: TemplateRef<any> | string;
    /** The trailing element to display in the accordion header. */

    trailing?: TemplateRef<any> | string;
    /**
     * If the accordion is initially open.
     *
     * This is ignored if the accordion section disabled property is true.
     *
     * @default false
     */
    isOpen?: boolean;
    /**
     * Indicates whether the accordion is disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The unique identifier for the accordion item.
     *
     * If not provided it will be generated automatically.
     */
    id?: string;
}

/**
 * A vertical stack of collapsible panels or that allows customers to expand or collapse each panel individually to
 * reveal or hide their content.
 *
 * @example
 *     ```html
 *     <ui-accordion [singleOpen]="false" [items]="[{title: 'Foo', children: 'Foo Children'}, {title: 'Bar', children: 'Bar Children'}, {title: 'Car', children: 'Car Children'}]"></ui-accordion>
 *     ```;
 *
 * @name Accordion
 * @phase Dev
 */
@Component({
    selector: 'ui-accordion',
    standalone: true,
    imports: [CommonModule, IconKeyboardArrowDown, IconKeyboardArrowUp],
    template: `@for (item of itemsWithIds(); track item) {
        <section [attr.data-disabled]="item.disabled ? true : null" [id]="item.id">
            <button
                type="button"
                [attr.aria-controls]="item.id + '-content'"
                [attr.aria-expanded]="isOpen(item)"
                data-header
                [disabled]="item.disabled ? true : null"
                (click)="!item.disabled && toggleOpen(item.id!)">
                @if (item.leading) {
                    <span data-leading>
                        @if (isTemplateRef(item.leading)) {
                            <ng-container>
                                <ng-container *ngTemplateOutlet="item.leading as TemplateRef"></ng-container>
                            </ng-container>
                        } @else {
                            <ng-container
                                *ngTemplateOutlet="leadingText; context: { $implicit: item.children }"></ng-container>
                        }
                        <ng-template #leadingText>{{ item.leading }}</ng-template>
                    </span>
                }

                <span data-title-subtitle>
                    <span data-title>{{ item.title }}</span>

                    @if (item.subtitle) {
                        <span data-subtitle>{{ item.subtitle }}</span>
                    }
                </span>

                @if (item.trailing) {
                    <span data-trailing>
                        @if (isTemplateRef(item.trailing)) {
                            <ng-container>
                                <ng-container *ngTemplateOutlet="item.trailing as TemplateRef"></ng-container>
                            </ng-container>
                        } @else {
                            <ng-container
                                *ngTemplateOutlet="trailingText; context: { $implicit: item.children }"></ng-container>
                        }
                        <ng-template #trailingText>{{ item.trailing }}</ng-template>
                    </span>
                }

                <span data-arrow>
                    @if (isOpen(item)) {
                        <icon-keyboard-arrow-up />
                    } @else {
                        <icon-keyboard-arrow-down />
                    }
                </span>
            </button>

            @if (isOpen(item)) {
                <div data-content [attr.data-hidden]="!isOpen(item) ? true : null" [id]="item.id + '-content'">
                    @if (isTemplateRef(item.children)) {
                        <ng-container>
                            <ng-container *ngTemplateOutlet="item.children as TemplateRef"></ng-container>
                        </ng-container>
                    } @else {
                        <ng-container
                            *ngTemplateOutlet="childrenText; context: { $implicit: item.children }"></ng-container>
                    }
                    <ng-template #childrenText let-content>{{ content }}</ng-template>
                </div>
            }
            <span data-divider></span>
        </section>
    }`,
    styleUrls: ['./accordion.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'accordion',
    },
})
export class UIAccordion {
    /**
     * Array of accordion sections
     *
     * @exampleType Array<AccordionSection>
     * @required
     */
    readonly items = input<AccordionSection[]>([]);

    /**
     * If true only one accordion section can be opened at a time
     *
     * @default true
     */
    readonly singleOpen = input(true);

    readonly itemsWithIds = computed(() =>
        this.items().map((item): AccordionSection & { id: string } => ({
            ...item,
            id: item.id || uniqueId('accordion-item'),
        })),
    );

    readonly openSections = model(
        this.itemsWithIds()
            .filter((i) => i.isOpen)
            .map((i) => i.id!),
    );

    toggleOpen(itemId: string) {
        const isOpen = this.openSections().includes(itemId);

        if (this.singleOpen()) {
            this.openSections.set(isOpen ? [] : [itemId]);
            return;
        }

        this.openSections.set(
            isOpen ? this.openSections().filter((id) => id !== itemId) : [...this.openSections(), itemId],
        );
    }

    isOpen(item: AccordionSection & { id: string }): boolean {
        return !!item.id && this.openSections().includes(item.id) && !item.disabled;
    }

    isTemplateRef(value: any): value is TemplateRef<any> {
        return value instanceof TemplateRef;
    }
}
