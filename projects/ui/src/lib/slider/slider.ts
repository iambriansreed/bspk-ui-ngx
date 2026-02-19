import { Component, ElementRef, input, model, OnDestroy, viewChild, ViewEncapsulation } from '@angular/core';
import { UITxtDirective } from '@ui/txt';
import { AsSignal, CommonProps } from '@ui/types/common';
import { UISliderIntervalDots } from './slider-interval-dots';

export type SliderValue = number | [number, number];

export interface SliderProps {
    /**
     * The label of the slider.
     *
     * @required
     */
    label: string;
    disabled: CommonProps['disabled'];
    readOnly: CommonProps['readOnly'];
    /**
     * The numerical value of the slider.
     *
     * Providing an array of two numbers will create a **range slider**.
     *
     * @required
     */
    value: number | [number, number];
    /**
     * The minimum value of the slider.
     *
     * @required
     */
    min: number;
    /**
     * The maximum value of the slider.;
     *
     * @required
     */
    max: number;
    /**
     * Indicates if marks should be displayed on the slider.
     *
     * @default false
     */
    marks?: boolean;
    /**
     * The number that specifies the granularity that the value must adhere to
     *
     * @default 1
     */
    step?: number;
    /**
     * Optional function to format the display of each number.
     *
     * Useful for currency, percentages, etc.
     */
    formatNumber?: (value: number, context?: 'max' | 'min' | 'rangeEnd' | 'rangeStart') => string;
    /**
     * The name of the slider input, useful for form submissions.
     *
     * @required
     */
    name: string;
}
/**
 * A control element that allows customers to select a value or adjust a setting by moving the handle along a horizontal
 * track.
 *
 * @name Slider
 * @phase Stable
 */
@Component({
    selector: 'ui-slider',
    imports: [UITxtDirective, UISliderIntervalDots],
    template: `
        <input [attr.name]="name() || null" type="hidden" [value]="hiddenInputValue" />
        <div data-top-labels>
            <div ui-txt="labels-small">{{ label() }}</div>
            <div ui-txt="body-base" data-value-label>{{ displayValue }}</div>
        </div>
        <div data-slider-parent>
            <div
                [attr.aria-disabled]="disabled() || undefined"
                [attr.aria-label]="label()"
                [attr.aria-readonly]="readOnly() || undefined"
                [attr.aria-valuemax]="max()"
                [attr.aria-valuemin]="min()"
                [attr.aria-valuenow]="arrayValues ? arrayValues[0] : singleValue"
                [attr.aria-valuetext]="displayValue"
                [attr.data-slider-body]="true"
                (click)="handleTrackClick($event)"
                (keydown)="handleTrackKeydown($event)"
                role="slider"
                [tabindex]="disabled() ? -1 : 0"
                #sliderRef>
                <div data-slider-background></div>
                <div data-slider-fill [style]="sliderFillStyles"></div>
                @if (marks()) {
                    <ui-slider-interval-dots
                        [min]="min()"
                        [max]="max()"
                        [step]="step() || 1"
                        [value]="arrayValues ? arrayValues : singleValue">
                    </ui-slider-interval-dots>
                }
            </div>
            @if (arrayValues) {
                <div
                    data-slider-knob
                    role="slider"
                    [attr.aria-label]="label() + ' start'"
                    [attr.aria-valuemin]="min()"
                    [attr.aria-valuemax]="max()"
                    [attr.aria-valuenow]="arrayValues[0]"
                    [attr.aria-valuetext]="arrayValues[0]?.toString()"
                    [style.left]="'calc(' + valuePercents.percent0 + '% - 8px)'"
                    [tabIndex]="disabled() ? -1 : 0"
                    (mousedown)="handleKnobMouseDown(0)($event)"
                    (keydown)="handleKnobKeyDown(0)($event)"
                    tabindex="1"></div>
            }
            <div
                data-slider-knob
                role="slider"
                [attr.aria-label]="arrayValues ? label() + ' end' : label()"
                [attr.aria-valuemin]="min()"
                [attr.aria-valuemax]="max()"
                [attr.aria-valuenow]="arrayValues ? arrayValues[1] : singleValue"
                [attr.aria-valuetext]="(arrayValues ? arrayValues[1] : singleValue)?.toString()"
                [style.left]="'calc(' + valuePercents.percent1 + '% - 8px)'"
                [tabIndex]="disabled() ? -1 : 0"
                (pointerdown)="handleKnobMouseDown(arrayValues ? 1 : 0)($event)"
                (keydown)="handleKnobKeyDown(arrayValues ? 1 : 0)($event)"
                tabindex="1"></div>
        </div>
        <div data-bottom-labels>
            <div ui-txt="body-small">
                {{ formattedNumber(min(), 'min') }}
            </div>
            <div ui-txt="body-small">
                {{ formattedNumber(max(), 'max') }}
            </div>
        </div>
    `,
    styleUrl: './slider.scss',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'slider',
        '[attr.data-readonly]': 'readOnly() || null',
        '[attr.data-disabled]': 'disabled() || null',
    },
})
export class UISlider implements AsSignal<SliderProps>, OnDestroy {
    readonly sliderRef = viewChild('sliderRef', { read: ElementRef });
    readonly value = model<SliderProps['value']>(0);

    readonly disabled = input<SliderProps['disabled']>(false);
    readonly min = input.required<SliderProps['min']>();
    readonly max = input.required<SliderProps['max']>();
    readonly step = input<SliderProps['step']>(1);
    readonly marks = input<SliderProps['marks']>(false);
    readonly readOnly = input<SliderProps['readOnly']>(false);
    readonly name = input.required<SliderProps['name']>();
    readonly label = input.required<SliderProps['label']>();
    readonly formatNumber = input<SliderProps['formatNumber']>(undefined);

    private dragRef: number | null = null;

    get arrayValues(): [number, number] | null {
        const value = this.value();

        return Array.isArray(value) ? value : null;
    }

    get singleValue(): number {
        const value = this.value();

        return Array.isArray(value) ? value[0] : value;
    }

    get formattedNumber() {
        if (this.formatNumber()) {
            return this.formatNumber() as NonNullable<SliderProps['formatNumber']>;
        }
        return (value: number) => value.toString();
    }

    get displayValue() {
        const rangeValues = this.arrayValues;

        if (rangeValues) {
            let [v0, v1] = rangeValues;

            if (v0 > v1) {
                [v0, v1] = [v1, v0];
            }

            return [this.formattedNumber(v0, 'rangeStart'), this.formattedNumber(v1, 'rangeEnd')].join(' - ');
        }

        return this.formattedNumber(this.singleValue, 'rangeStart');
    }

    get hiddenInputValue() {
        const rangeValues = this.arrayValues;
        return rangeValues ? `${rangeValues[0]},${rangeValues[1]}` : this.singleValue;
    }

    get valuePercents() {
        const arrayValues = this.arrayValues;

        let val0: number;
        let val1: number;

        if (arrayValues) {
            val0 = arrayValues[0];
            val1 = arrayValues[1];
        } else {
            val0 = this.singleValue;
            val1 = this.singleValue;
        }

        if (arrayValues && val0 > val1) {
            [val0, val1] = [val1, val0];
        }

        const percent0 = Math.min(Math.max(((val0 - this.min()) / (this.max() - this.min())) * 100, 0), 100);

        const percent1 = Math.min(Math.max(((val1 - this.min()) / (this.max() - this.min())) * 100, 0), 100);

        return { percent0, percent1 };
    }

    get sliderFillStyles() {
        const { percent0, percent1 } = this.valuePercents;

        return {
            left: this.arrayValues ? `${percent0}%` : '0%',
            width: this.arrayValues ? `${percent1 - percent0}%` : `${percent0}%`,
        };
    }

    handleTrackClick(event: MouseEvent) {
        if (this.disabled() || this.readOnly()) return;

        const clickValue = this.getValueFromPosition(event.clientX);
        const normalized = this.normalizeSliderValue(clickValue);

        let nextValue: number | [number, number] = normalized;

        const rangeValues = this.arrayValues;

        if (rangeValues) {
            const [val0, val1] = rangeValues;

            if (Math.abs(clickValue - val0) < Math.abs(clickValue - val1)) {
                nextValue = [normalized, val1];
                this.dragRef = 0;
            } else {
                nextValue = [val0, normalized];
                this.dragRef = 1;
            }

            // Begin dragging immediately (React behavior)
            window.addEventListener('mousemove', this.handleMouseMove);
            window.addEventListener('mouseup', this.handleMouseUp);
        }

        this.value.set(nextValue);
    }

    handleMouseMove = (e: MouseEvent) => {
        if (this.dragRef === null || this.disabled() || this.readOnly()) return;
        const newValue = this.getValueFromPosition(e.clientX);
        const normalValue = this.normalizeSliderValue(newValue);
        let nextValue: number | [number, number] = normalValue;
        const arrayValues = this.arrayValues;
        if (arrayValues) nextValue = this.dragRef === 0 ? [normalValue, arrayValues[1]] : [arrayValues[0], normalValue];
        this.value.set(nextValue);
    };

    handleMouseUp = () => {
        this.dragRef = null;
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    };

    handleKnobMouseDown = (knobIndex: 0 | 1) => (event: MouseEvent) => {
        if (this.disabled() || this.readOnly()) return;
        event.stopPropagation();
        this.dragRef = knobIndex;
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    handleTrackKeydown(event: KeyboardEvent) {
        if (this.disabled() || this.readOnly()) return;

        if (!this.arrayValues && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            this.handleKnobKeyDown(0)(event);
        }
    }

    handleKnobKeyDown = (knobIndex: 0 | 1) => (event: KeyboardEvent) => {
        const arrayValues = this.arrayValues;
        if (this.disabled() || this.readOnly()) return;
        let newValue = knobIndex === 0 || !arrayValues ? this.singleValue : arrayValues[1];
        if (event.key === 'ArrowLeft') newValue -= this.step() || 1;
        else if (event.key === 'ArrowRight') newValue += this.step() || 1;
        else return;
        newValue = this.normalizeSliderValue(newValue);

        let nextValue: number | [number, number] = newValue;
        if (arrayValues) {
            if (knobIndex === 0) nextValue = [newValue, arrayValues[1]];
            else nextValue = [arrayValues[0], newValue];
        }

        this.value.set(nextValue);
    };

    ngOnDestroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    private getValueFromPosition(clientX: number): number {
        const slider = this.sliderRef();
        if (!slider) return this.min();
        const { left, width } = slider.nativeElement.getBoundingClientRect();
        let percent = (clientX - left) / width;
        percent = Math.max(0, Math.min(1, percent));
        return this.normalizeSliderValue(this.min() + percent * (this.max() - this.min()));
    }

    private normalizeSliderValue(val: number) {
        const clamp = (value: number) => Math.min(Math.max(value, this.min()), this.max());
        let newValue = clamp(val);

        newValue = Math.round(newValue / (this.step() || 1)) * (this.step() || 1);

        return clamp(newValue);
    }
}
