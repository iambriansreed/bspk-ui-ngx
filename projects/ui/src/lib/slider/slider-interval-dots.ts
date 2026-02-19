import { Component, input, computed } from '@angular/core';
import { SliderProps } from './slider'; // adjust path

type SliderIntervalDotsProps = Pick<SliderProps, 'max' | 'min' | 'value'> & {
    step: number;
};

/**
 * SliderIntervalDots component displays interval dots along a slider track.
 *
 * @ignore
 */
@Component({
    selector: 'ui-slider-interval-dots',
    standalone: true,
    template: `
        @for (dot of dots(); track dot.index) {
            <div
                data-interval-dot
                [attr.data-filled-section]="dot.filled ? '' : null"
                [style.left.%]="dot.percent"></div>
        }
    `,
})
export class UISliderIntervalDots {
    readonly min = input<SliderIntervalDotsProps['min']>(0);
    readonly max = input<SliderIntervalDotsProps['max']>(100);
    readonly step = input<SliderIntervalDotsProps['step']>(1);
    readonly value = input<SliderIntervalDotsProps['value']>(0);

    readonly dots = computed(() => {
        const min = this.min();
        const max = this.max();
        const step = this.step();
        const value = this.value();

        if (step <= 0) return [];

        const count = Math.floor((max - min) / step);
        const result: { index: number; percent: number; filled: boolean }[] = [];

        for (let i = 1; i < count; i++) {
            const pointValue = min + i * step;
            const percent = ((pointValue - min) / (max - min)) * 100;

            let filled = false;

            if (typeof value === 'number') {
                filled = pointValue < value;
            } else {
                filled = pointValue < value[0];
            }

            result.push({
                index: i,
                percent,
                filled,
            });
        }

        return result;
    });
}
