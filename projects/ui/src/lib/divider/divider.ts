import { Component, ViewEncapsulation, input } from '@angular/core';
import { AsSignal } from '../../types/common';

export interface DividerProps {
    /**
     * The orientation of the divider.
     *
     * @default horizontal
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The thickness of the divider.
     *
     * @default light
     */
    thickness?: 'heavy' | 'light';
    /**
     * If the divider padding is shown.
     *
     * @default true
     */
    padding?: boolean;
    /**
     * The inset (margin) of the divider. The value is a number between 0 and 12, which corresponds to the spacing
     * sizing variables defined in the theme. The inset is applied to the left and right sides of the divider when the
     * orientation is horizontal, and to the top and bottom when the orientation is vertical.
     *
     * @default 0
     */
    inset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const insetToVariable = (insetProp: number | string) => {
    const inset = Number(insetProp);
    if (inset === undefined || inset === null || inset < 1 || inset > 12) return '0px';
    return `var(--spacing-sizing-${inset.toString().padStart(2, '0')})`;
};

/**
 * Horizontal thin lines that separates grouped content in a list or other containers with an optional section/group
 * label.
 *
 * Vertical thin lines that separates grouped content or other visual elements within a container.
 *
 * @example
 *     <div style="width: 320px">
 *     <div>Content above the divider</div>
 *     <ui-divider orientation="horizontal"></ui-divider>
 *     <div>Content below the divider</div>
 *     </div>
 *
 * @name Divider
 * @phase Dev
 */
@Component({
    selector: 'ui-divider',
    standalone: true,
    template: ``,
    styleUrl: './divider.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'divider',
        role: 'separator',
        '[attr.aria-hidden]': 'true',
        '[attr.aria-orientation]': 'orientation() || "horizontal"',
        '[attr.data-hide-padding]': 'padding() ? null : true',
        '[attr.data-orientation]': 'orientation() || "horizontal"',
        '[attr.data-thickness]': 'thickness() || "light"',
        '[style.--inset]': 'insetStyle()',
    },
})
export class UIDivider implements AsSignal<DividerProps> {
    readonly orientation = input<DividerProps['orientation']>('horizontal');
    readonly thickness = input<DividerProps['thickness']>('light');
    readonly padding = input<DividerProps['padding']>(true);
    readonly inset = input<DividerProps['inset']>(0);

    insetStyle() {
        return insetToVariable(this.inset() ?? 0);
    }
}
