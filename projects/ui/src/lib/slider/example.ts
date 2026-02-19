import { Component, signal } from '@angular/core';
import { UISlider } from './slider';

@Component({
    selector: 'ui-slider-example',
    standalone: true,
    imports: [UISlider],
    template: `
        <h4>Default</h4>
        <ui-slider
            [value]="values()['default']"
            (valueChange)="update('default', $event)"
            name="default-slider"
            label="Default Slider"
            [min]="0"
            [max]="100" />

        <h4>Range</h4>
        <ui-slider
            [value]="values()['range']"
            (valueChange)="update('range', $event)"
            name="range-slider"
            label="Range Slider"
            [min]="0"
            [max]="100" />

        <h4>Disabled</h4>
        <ui-slider
            name="disabled-slider"
            label="Disabled Slider"
            [min]="0"
            [max]="100"
            [value]="50"
            [disabled]="true" />

        <h4>Read Only</h4>
        <ui-slider
            name="readonly-slider"
            label="Read Only Slider"
            [min]="0"
            [max]="100"
            [value]="30"
            [readOnly]="true" />

        <h4>Custom Step</h4>
        <ui-slider
            [value]="values()['step']"
            (valueChange)="update('step', $event)"
            name="step-slider"
            label="Step of 5"
            [min]="0"
            [max]="100"
            [step]="5" />

        <h4>Custom Formatting</h4>
        <ui-slider
            [value]="values()['formatted']"
            (valueChange)="update('formatted', $event)"
            name="formatted-slider"
            label="Currency Format"
            [min]="0"
            [max]="1000"
            [step]="50"
            [formatNumber]="formatExample" />
    `,
})
export class UISliderExample {
    readonly values = signal<{
        default: number;
        range: [number, number];
        step: number;
        formatted: number;
    }>({
        default: 50,
        range: [25, 75],
        step: 20,
        formatted: 250,
    });

    update(key: keyof ReturnType<typeof this.values>, value: number | [number, number]) {
        this.values.update((current) => ({
            ...current,
            [key]: value,
        }));
    }

    formatExample = (value: number) => {
        return `$${value.toFixed(0)}`;
    };
}
