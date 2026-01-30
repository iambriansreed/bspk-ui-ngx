import {
    Component,
    input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ElementRef,
    viewChild,
    signal,
    OnInit,
    OnChanges,
} from '@angular/core';
import { format, startOfToday, parse } from 'date-fns';
import { AsSignal, CommonProps } from '../../types/common';
import { UIButton } from '../button';
import { UICalendar } from '../calendar';
import { UIFloatingDirective } from '../floating';
import { IconEvent } from '../icons';
import { UIInput } from '../input';
import { UIOutsideClickDirective } from '../outside-click';

function parseDate(value?: string): Date | undefined {
    if (!value) return undefined;
    const parsed = parse(value, 'MM/dd/yyyy', new Date());
    return isNaN(parsed.getTime()) ? undefined : parsed;
}

export type DatePickerProps = CommonProps<
    | 'ariaDescribedBy'
    | 'ariaErrorMessage'
    | 'ariaLabel'
    | 'disabled'
    | 'id'
    | 'invalid'
    | 'name'
    | 'readOnly'
    | 'required'
> & {
    /**
     * If the calendar should close when a date is selected.
     *
     * @default true
     */
    closeCalendarOnChange?: boolean;
    /**
     * The currently selected date
     *
     * String formatted as 'MM/dd/yyyy'.
     *
     * @type string
     */
    value?: Date | string | undefined;
    /**
     * The placeholder text for the date input field.
     *
     * @default mm/dd/yyyy
     */
    placeholder?: string;
    /**
     * The size of the element.
     *
     * @default 'medium'
     */
    size?: 'large' | 'medium' | 'small';
};

/**
 * An input that allows a customer to manually type in a specific date or triggers a the Calendar component to select a
 * date.
 *
 * @example
 *     <ui-date-picker
 *     [value]="selectedDate"
 *     (onChange)="handleDateChange($event)"
 *     ></ui-date-picker>
 *
 * @name DatePicker
 * @phase Dev
 */
@Component({
    selector: 'ui-date-picker',
    standalone: true,
    imports: [UIButton, UICalendar, UIInput, UIFloatingDirective, UIOutsideClickDirective],
    template: `
        <div data-bspk="date-picker" #root>
            <ui-input
                #reference
                [ariaDescribedBy]="ariaDescribedBy()"
                [ariaErrorMessage]="ariaErrorMessage()"
                [ariaLabel]="ariaLabel()"
                [disabled]="disabled()"
                [id]="id()"
                [invalid]="invalid()"
                [name]="name() || 'DatePickerInput'"
                [placeholder]="placeholder() || 'mm/dd/yyyy'"
                [readOnly]="readOnly()"
                [required]="required()"
                [showClearButton]="false"
                [size]="size() || 'medium'"
                [value]="internalValueAsString"
                (valueChange)="onInputChange($event)"
                [trailing]="calendarButton"></ui-input>

            <ng-template #calendarButton>
                @if (!disabled() && !readOnly()) {
                    <ui-button
                        [icon]="IconEvent"
                        [iconOnly]="true"
                        label="Toggle calendar"
                        variant="tertiary"
                        (onClick)="toggleCalendar()"></ui-button>
                }
            </ng-template>
            @if (calendarVisible()) {
                <div
                    aria-label="Choose Date"
                    aria-modal="true"
                    data-bspk="calendar-popup"
                    role="dialog"
                    [ui-floating]="{ reference: referenceEl, offsetOptions: offset }"
                    [ui-outside-click]="{
                        callback: handleOutsideClick.bind(this),
                    }"
                    #calendarPopup>
                    <ui-calendar
                        [focusTrap]="true"
                        [id]="calendarId"
                        [value]="activeDate()"
                        (onChange)="onCalendarChange($event)"></ui-calendar>
                </div>
            }
        </div>
    `,
    styleUrl: './date-picker.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIDatePicker implements OnInit, OnChanges, AsSignal<DatePickerProps> {
    @Output() readonly valueChange = new EventEmitter<string>();

    // Inputs
    readonly value = input<Date | string | undefined>(undefined);
    readonly disabled = input<DatePickerProps['disabled']>();
    readonly readOnly = input<DatePickerProps['readOnly']>();
    readonly closeCalendarOnChange = input<DatePickerProps['closeCalendarOnChange']>(true);
    readonly name = input<DatePickerProps['name']>('DatePickerInput');
    readonly placeholder = input<DatePickerProps['placeholder']>('mm/dd/yyyy');
    readonly invalid = input<DatePickerProps['invalid']>(false);
    readonly required = input<DatePickerProps['required']>(false);
    readonly size = input<DatePickerProps['size']>('medium');
    readonly id = input<DatePickerProps['id']>(undefined);
    readonly ariaLabel = input<DatePickerProps['ariaLabel']>('Enter or choose date');
    readonly ariaDescribedBy = input<DatePickerProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<DatePickerProps['ariaErrorMessage']>(undefined);

    // State
    readonly calendarVisible = signal(false);
    readonly floatingStyles = signal<Record<string, string>>({});
    readonly activeDate = signal<Date>(startOfToday());
    readonly reference = viewChild('reference', { read: ElementRef });
    readonly internalValue = signal<Date | string | undefined>(this.value());

    IconEvent = IconEvent;

    get calendarId() {
        return `${this.id() || 'date-picker'}-calendar`;
    }

    get referenceEl() {
        return this.reference()!.nativeElement as HTMLElement;
    }

    get offset() {
        // Reads the CSS variable value at runtime, offsetOptions requires a number
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--spacing-sizing-01'));
    }

    get internalValueAsString(): string {
        const value = this.internalValue();
        if (value instanceof Date) {
            return format(value, 'MM/dd/yyyy');
        }
        return value ?? '';
    }

    handleOutsideClick = (): void => {
        this.calendarVisible.set(false);
    };

    ngOnInit() {
        this.setActiveDateFromValue();
        this.internalValue.set(this.value());
    }

    ngOnChanges() {
        this.setActiveDateFromValue();
        this.internalValue.set(this.value());
    }

    setActiveDateFromValue() {
        const value = this.value();
        const parsed = typeof value === 'string' ? parseDate(value) : value instanceof Date ? value : undefined;
        this.activeDate.set(parsed || startOfToday());
    }

    toggleCalendar() {
        this.calendarVisible.set(!this.calendarVisible());
    }

    closeCalendar = () => {
        this.calendarVisible.set(false);
    };

    onInputChange(value: string | undefined) {
        this.valueChange.emit(value ?? '');
        this.internalValue.set(value);
        const parsed = value ? parseDate(value) : undefined;
        if (parsed) {
            this.activeDate.set(parsed);
        }
    }

    onCalendarChange(date: Date) {
        const formatted = format(date, 'MM/dd/yyyy');
        this.internalValue.set(formatted);
        this.activeDate.set(date);
        if (this.closeCalendarOnChange()) {
            this.calendarVisible.set(false);
        }
        this.valueChange.emit(formatted);
    }
}
