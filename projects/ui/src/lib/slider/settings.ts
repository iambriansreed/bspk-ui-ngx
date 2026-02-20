import { ComponentSettings } from '@shared/types';
import { SliderProps } from './slider';

export const Slider: ComponentSettings<SliderProps> = {
    content: [
        {
            position: 'afterDescription',
            component: {
                title: 'Range Slider',
                description:
                    'A control element that allows customers to select a value or adjust a setting by moving the handle along a horizontal track.',
                inputs: {
                    label: 'Range option',
                    min: 0,
                    max: 100,
                    step: 1,
                    value: [70, 80],
                    formatNumber: (num) => {
                        return `${num}%`;
                    },
                    name: 'range-slider',
                },
            },
        },
        {
            position: 'afterDescription',
            component: {
                title: 'Continuous Slider',
                description: 'Continuous sliders allow users to select a value along a subjective range.',
                inputs: {
                    label: 'What is the purpose of life?',
                    min: 0,
                    max: 100,
                    value: 42,
                    step: 1,
                    formatNumber: (num) => num.toFixed(0),
                    name: 'continuous-slider',
                    marks: false,
                },
            },
        },
        {
            position: 'afterDescription',
            component: {
                title: 'Discrete Slider',
                description:
                    'Discrete sliders can be adjusted to a specific value by referencing its value indicator. You can generate a mark for each step with marks={true}.',
                inputs: {
                    label: 'Discrete option',
                    min: 0,
                    max: 100,
                    step: 10,
                    value: 40,
                    formatNumber: (num) => num.toString(),
                    name: 'discrete-slider',
                    marks: true,
                },
            },
        },
    ],
};

//
