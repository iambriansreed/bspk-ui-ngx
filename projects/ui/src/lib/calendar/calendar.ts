import {
    Component,
    input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ElementRef,
    viewChild,
    AfterViewInit,
    OnInit,
} from '@angular/core';
import {
    addMonths,
    addYears,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isValid,
    startOfMonth,
    startOfToday,
    startOfWeek,
} from 'date-fns';
import { AsSignal } from '../../types/common';
import { UIButton } from '../button';
import { IconChevronLeft } from '../icons/chevron-left';
import { IconChevronRight } from '../icons/chevron-right';
import { IconKeyboardDoubleArrowLeft } from '../icons/keyboard-double-arrow-left';
import { IconKeyboardDoubleArrowRight } from '../icons/keyboard-double-arrow-right';
import { getCalendarKeydownHandler, optionIdGenerator, COLUMNS_COUNT } from './utils';

export interface CalendarProps {
    /**
     * The currently selected date
     *
     * @type Date
     */
    value: Date | undefined;
    /**
     * When true, keyboard focus is trapped within the calendar component on initial render.
     *
     * Only applicable if the Calendar is used in a popover like in DatePicker.
     *
     * @default false
     */
    focusTrap?: boolean;
    /** The id of the calendar component. */
    id?: string;
}

/**
 * Allows customers to select the date, month, and year.
 *
 * @example
 *     <ui-calendar (onChange)="handleChange($event)" />
 *
 * @name Calendar
 * @phase Dev
 */
@Component({
    selector: 'ui-calendar',
    standalone: true,
    template: `
        <div data-bspk="calendar" [id]="id()">
            <div data-header>
                <ui-button
                    label="Previous Year"
                    variant="tertiary"
                    size="large"
                    (click)="setActiveDate(addYears(activeDate, -1))"
                    (keydown)="onFirstButtonKeydown($event)"
                    #firstButton
                    [icon]="IconKeyboardDoubleArrowLeft"
                    [iconOnly]="true">
                </ui-button>
                <ui-button
                    label="Previous Month"
                    variant="tertiary"
                    size="large"
                    (click)="setActiveDate(addMonths(activeDate, -1))"
                    [iconOnly]="true"
                    [icon]="IconChevronLeft">
                </ui-button>
                <span data-title>{{ format(activeDate, 'MMMM yyyy') }}</span>
                <ui-button
                    label="Next Month"
                    variant="tertiary"
                    size="large"
                    (click)="setActiveDate(addMonths(activeDate, 1))"
                    [iconOnly]="true"
                    [icon]="IconChevronRight">
                </ui-button>
                <ui-button
                    label="Next Year"
                    variant="tertiary"
                    size="large"
                    (click)="setActiveDate(addYears(activeDate, 1))"
                    #lastButton
                    [iconOnly]="true"
                    [icon]="IconKeyboardDoubleArrowRight">
                </ui-button>
            </div>

            <table role="grid">
                <thead>
                    <tr>
                        <th abbr="Sunday" scope="col">Sun</th>
                        <th abbr="Monday" scope="col">Mon</th>
                        <th abbr="Tuesday" scope="col">Tue</th>
                        <th abbr="Wednesday" scope="col">Wed</th>
                        <th abbr="Thursday" scope="col">Thu</th>
                        <th abbr="Friday" scope="col">Fri</th>
                        <th abbr="Saturday" scope="col">Sat</th>
                    </tr>
                </thead>
                <tbody [id]="gridId" (keydown)="onGridKeydown($event)" #grid tabindex="0">
                    @for (week of rows; track week[0]?.getTime() ?? -1) {
                        <tr>
                            @for (date of week; track date?.getTime() ?? -1) {
                                <td
                                    [attr.aria-label]="format(date, 'do MMMM yyyy')"
                                    [attr.data-selected]="isSameDay(date, activeDate) ? true : null"
                                    [id]="generateOptionId(date)"
                                    (click)="onChange.emit(date)"
                                    [attr.role]="isSameDay(date, activeDate) ? 'gridcell' : null"
                                    [attr.tabindex]="isSameDay(date, activeDate) ? 0 : -1">
                                    {{ format(date, 'd') }}
                                </td>
                            }
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    `,
    imports: [UIButton],
    styleUrl: './calendar.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UICalendar implements AfterViewInit, OnInit, AsSignal<CalendarProps> {
    @Output() onChange = new EventEmitter<Date>();

    IconKeyboardDoubleArrowLeft = IconKeyboardDoubleArrowLeft;
    IconKeyboardDoubleArrowRight = IconKeyboardDoubleArrowRight;
    IconChevronLeft = IconChevronLeft;
    IconChevronRight = IconChevronRight;

    readonly value = input<CalendarProps['value']>(undefined);
    readonly focusTrap = input<CalendarProps['focusTrap']>(false);
    readonly id = input<CalendarProps['id']>(undefined);

    activeDate: Date = startOfToday();
    focusDay = false;

    format = format;
    isSameDay = isSameDay;
    addYears = addYears;
    addMonths = addMonths;

    private readonly firstButton = viewChild<ElementRef<HTMLButtonElement>>('firstButton');
    private readonly lastButton = viewChild<ElementRef<HTMLButtonElement>>('lastButton');
    private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

    get rows(): Date[][] {
        const start = startOfWeek(startOfMonth(this.activeDate), { weekStartsOn: 0 });
        const end = endOfWeek(endOfMonth(this.activeDate), { weekStartsOn: 0 });
        const days = eachDayOfInterval({ start, end });
        const weeks: Date[][] = [];
        for (let i = 0; i < days.length; i += COLUMNS_COUNT) {
            weeks.push(days.slice(i, i + COLUMNS_COUNT));
        }
        return weeks;
    }

    get gridId() {
        return `${this.id() || 'calendar'}-grid`;
    }

    ngOnInit() {
        this.activeDate = this.value() && isValid(this.value()) ? (this.value() as Date) : startOfToday();
    }

    ngAfterViewInit() {
        if (this.focusDay) {
            setTimeout(() => {
                const selectedDateId = this.generateOptionId(this.activeDate);
                const selectedDateElement = this.grid()?.nativeElement?.querySelector<HTMLElement>(
                    `#${selectedDateId}`,
                );
                selectedDateElement?.focus();
                this.focusDay = false;
            }, 0);
        }
    }

    setActiveDate(date: Date) {
        this.activeDate = date;
    }

    generateOptionId(date: Date): string {
        return optionIdGenerator(this.id() || 'calendar')(date);
    }

    onFirstButtonKeydown(event: KeyboardEvent) {
        if (this.focusTrap() && event.shiftKey && event.key === 'Tab') {
            event.preventDefault();
            event.stopPropagation();
            this.focusDay = true;
            setTimeout(() => this.grid?.()?.nativeElement?.focus(), 0);
        }
    }

    onGridKeydown(event: KeyboardEvent) {
        // Use the shared calendar keydown handler from utils
        getCalendarKeydownHandler(
            this.activeDate,
            (date: Date) => {
                this.setActiveDate(date);
            },
            this.rows,
            () => {
                this.focusDay = true;
                setTimeout(() => {
                    const selectedDateId = this.generateOptionId(this.activeDate);
                    const selectedDateElement = this.grid()?.nativeElement?.querySelector<HTMLElement>(
                        `#${selectedDateId}`,
                    );
                    selectedDateElement?.focus();
                    this.focusDay = false;
                }, 0);
            },
        )(event);

        // Tab navigation for focus trap
        if (this.focusTrap() && event.key === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            this.firstButton()?.nativeElement?.focus();
        }
    }
}
