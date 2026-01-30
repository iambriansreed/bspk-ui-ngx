import { Component, ViewEncapsulation, input } from '@angular/core';
import { AsSignal } from '../../types/common';
import { ColorVariant } from '../../utils/color-variants';

export interface TagProps {
    /**
     * The label of the tag.
     *
     * @required
     */
    label: string;
    /**
     * The size of the tag.
     *
     * @default small
     */
    size?: 'small' | 'x-small';
    /**
     * The color of the tag.
     *
     * @default grey
     */
    color?: ColorVariant;
    /**
     * The display variant of the tag.
     *
     * @default flat
     */
    variant?: 'corner-wrap' | 'flat' | 'pill';
}

/**
 * A non-interactive visual indicators to draw attention or categorization of a component.
 *
 * @name Tag
 * @phase UXReview
 */
@Component({
    selector: 'ui-tag',
    standalone: true,
    imports: [],
    template: `<span class="truncated">{{ label() }}</span>
        @if (variant() === 'corner-wrap') {
            <div data-triangle></div>
        }`,
    styleUrls: ['./tag.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'tag',
        '[attr.data-color]': 'color()',
        '[attr.data-size]': 'size()',
        '[attr.data-variant]': 'variant()',
        style: 'cursor: pointer;',
    },
})
export class UITag implements AsSignal<TagProps> {
    readonly label = input.required<TagProps['label']>();
    readonly size = input<TagProps['size']>('small');
    readonly color = input<TagProps['color']>('grey');
    readonly variant = input<TagProps['variant']>('flat');
}
