import { Component, ElementRef, ViewEncapsulation, input, viewChild } from '@angular/core';

export interface BadgeProps {
    count?: number;
    size?: string;
    color?: string;
    surfaceBorder?: boolean;
}

/**
 * Visual indicator for new items within a parent page represented with a numerical count of new items.
 *
 * @example
 *     import { Badge } from '@bspk/ui/Badge';
 *
 *     <Badge count={5} size="small" color="primary" surfaceBorder={true} />;
 *
 * @exampleDescription This example shows a badge with a count of 5, size small, and primary variant.
 *
 * @name Badge
 * @phase Dev
 */

@Component({
    selector: 'ui-badge',
    standalone: true,
    template: `<span #contentWrapper><ng-content></ng-content></span>
        <sup
            data-bspk="badge"
            [attr.data-color]="color()"
            [attr.data-size]="size()"
            [attr.data-surface-border]="surfaceBorder() ? true : undefined"
            [attr.data-attachment]="hasProjectedContent ? true : undefined">
            {{ typeof count() === 'number' && count()! > 99 ? '99+' : count() }}
        </sup>`,
    styleUrls: ['./badge.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'badge-wrapper',
        'data-attachment-wrapper': '',
    },
})
export class UIBadge {
    /**
     * The context for which the badge is applied.
     *
     * Could be a button, link, or any other element that the badge is associated with.
     */
    readonly contentWrapper = viewChild.required<ElementRef<HTMLElement>>('contentWrapper');

    /**
     * The content of the badge. If larger than 99, the badge will display '99+'.
     *
     * @example
     *     5;
     *
     * @default 1
     */
    readonly count = input<number | undefined>(1);

    /**
     * The size of the badge.
     *
     * @default small
     */
    readonly size = input<'small' | 'x-small'>('small');

    /**
     * The color variant of the badge.
     *
     * @default primary
     */
    readonly color = input<'primary' | 'secondary'>('primary');

    /**
     * Whether the badge should have a border that matches the surface color.
     *
     * @default false
     */
    readonly surfaceBorder = input(false);

    /**
     * Indicates whether the badge has projected (custom) content.
     *
     * This is set to `true` if any content is projected into the badge component (for example,
     * <ui-badge>New</ui-badge>), and `false` if only the `count` input is used. Used internally to determine whether to
     * display the projected content or the count.
     *
     * @internal
     */
    get hasProjectedContent() {
        return !!this.contentWrapper().nativeElement?.childNodes.length;
    }
}
