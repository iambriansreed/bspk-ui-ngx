import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
    ViewEncapsulation,
} from '@angular/core';

export type BadgeProps = {
    count?: number;
    size?: string;
    color?: string;
    surfaceBorder?: boolean;
};

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
 * @phase UXReview
 */

@Component({
    selector: 'ui-badge',
    standalone: true,
    templateUrl: './badge.html',
    styleUrls: ['./badge.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Badge implements AfterViewInit {
    /**
     * The content of the badge. If larger than 99, the badge will display '99+'.
     *
     * @example
     *     5;
     *
     * @default 1
     */
    @Input() count: number | undefined = 1;

    /**
     * The size of the badge.
     *
     * @default small
     */
    @Input() size: 'small' | 'x-small' = 'small';

    /**
     * The color variant of the badge.
     *
     * @default primary
     */
    @Input() color: 'primary' | 'secondary' = 'primary';

    /**
     * Whether the badge should have a border that matches the surface color.
     *
     * @default false
     */
    @Input() surfaceBorder: boolean = false;

    /**
     * Indicates whether the badge has projected (custom) content.
     *
     * This is set to `true` if any content is projected into the badge component (for example,
     * <ui-badge>New</ui-badge>), and `false` if only the `count` input is used. Used internally to determine whether to
     * display the projected content or the count.
     *
     * @internal
     */
    hasProjectedContent = false;
    /**
     * The context for which the badge is applied.
     *
     * Could be a button, link, or any other element that the badge is associated with.
     *
     * @type
     */
    @ViewChild('contentWrapper', { static: false }) contentWrapper!: ElementRef<HTMLSpanElement>;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        const nodes = this.contentWrapper.nativeElement.childNodes;
        this.hasProjectedContent = Array.from(nodes).some(
            (node) =>
                node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
        );
        this.cdr.detectChanges();
    }
}
