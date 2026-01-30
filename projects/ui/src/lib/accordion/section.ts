import { CommonModule } from '@angular/common';
import { Component, output, input, model } from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { IconKeyboardArrowDown, IconKeyboardArrowUp } from '../icons';

export type AccordionSectionProps = CommonProps<'id'> & {
    /**
     * The title of the accordion.
     *
     * @required
     */
    title: string;
    /** The subtitle of the accordion. */
    subtitle?: string;
    /**
     * The leading element to display in the accordion header.
     *
     * May be passed as string or use <span data-leading> for non-string content.
     */
    leading?: string;
    /**
     * The trailing element to display in the accordion header.
     *
     * May be passed as string or use <span data-trailing> for non-string content.
     */
    trailing?: string;
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
};

/** A utility component representing a single section within an accordion. */
@Component({
    selector: 'ui-accordion-section',
    standalone: true,
    imports: [CommonModule, IconKeyboardArrowDown, IconKeyboardArrowUp],
    host: {
        'data-bspk': 'accordion-item',
        '[attr.data-disabled]': 'disabled() ? true : null',
        '[id]': 'id()',
    },
    template: `
        <button
            type="button"
            [attr.aria-controls]="id() + '-content'"
            [attr.aria-expanded]="isOpen()"
            data-header
            [disabled]="disabled() ? true : null"
            (click)="!disabled() && toggleOpen.emit(id()!)">
            <ng-content select="[data-leading]">
                @if (leading()) {
                    <span data-leading>{{ leading() }}</span>
                }
            </ng-content>

            <span data-title-subtitle>
                <span data-title>{{ title() }}</span>

                @if (subtitle()) {
                    <span data-subtitle>{{ subtitle() }}</span>
                }
            </span>
            <ng-content select="[data-trailing]">
                @if (trailing()) {
                    <span data-trailing>{{ trailing() }}</span>
                }
            </ng-content>

            <span data-arrow>
                @if (isOpen()) {
                    <icon-keyboard-arrow-up />
                } @else {
                    <icon-keyboard-arrow-down />
                }
            </span>
        </button>
        @if (isOpen()) {
            <div data-content [id]="id() + '-content'">
                <ng-content></ng-content>
            </div>
        }
        <span data-divider></span>
    `,
})
export class UIAccordionSection implements AsSignal<AccordionSectionProps> {
    toggleOpen = output<string>();

    readonly title = input<AccordionSectionProps['title']>('');
    readonly subtitle = input<AccordionSectionProps['subtitle']>(undefined);
    readonly isOpen = model<AccordionSectionProps['isOpen']>(false);
    readonly disabled = input<AccordionSectionProps['disabled']>(false);
    readonly id = input<AccordionSectionProps['id']>(uniqueId('accordion-section'));
    readonly leading = input<AccordionSectionProps['leading']>(undefined);
    readonly trailing = input<AccordionSectionProps['trailing']>(undefined);
}
