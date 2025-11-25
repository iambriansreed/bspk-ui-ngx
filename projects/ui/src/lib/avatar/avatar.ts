import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPerson } from '../icons/person';
import { UITooltipDirective } from '../tooltip';

export type SizeVariant =
    | 'large'
    | 'medium'
    | 'small'
    | 'x-large'
    | 'x-small'
    | 'xx-large'
    | 'xxx-large'
    | 'xxxx-large'
    | 'xxxxx-large';

/**
 * An avatar is a visual representation of a user or entity. It can be used to display an initials, icon, or image.
 *
 * @example
 *     import { Avatar } from '@bspk/ui/Avatar';
 *
 *     <Avatar
 *     color="blue"
 *     showIcon
 *     image="/avatar-01.png"
 *     initials="AR"
 *     name="Andre Giant"
 *     size="large"
 *     disabled={false}
 *     onClick={() => action('Launch avatar popover')}
 *     showIcon={false}
 *     hideTooltip={true}
 *     />;
 *
 * @exampleDescription The image if provided is displayed first, followed by the icon if provided, and finally the initials. If no initials are provided, the first two letters of the name will be used as initials.
 *
 * @name Avatar
 * @phase UXReview
 */
@Component({
    selector: 'ui-avatar',
    standalone: true,
    imports: [CommonModule, IconPerson, UITooltipDirective],
    templateUrl: './avatar.html',
    styleUrls: ['./avatar.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UIAvatar {
    /**
     * The name of the person or entity represented by the avatar. This is used for accessibility purposes.
     *
     * @example
     *     Andre Giant
     *
     * @required
     */
    @Input() name!: string;

    /**
     * The size of the avatar.
     *
     * @default small
     */
    @Input() size: SizeVariant = 'small';

    /**
     * The color of the avatar.
     *
     * @default grey
     */
    @Input() color: string = 'grey';

    /**
     * Customizable initials to display in the avatar limited to 2 characters.
     *
     * By default, initials are the first letters of the first two words in the name. For a single-word name, only one
     * initial is shown. Names with three or more words, only the first two initials are used.
     *
     * @example
     *     AG;
     */
    @Input() initials?: string;

    /**
     * Whether to show the icon in the avatar instead of the initials.
     *
     * If an image is provided, the image will be shown instead of the icon.
     *
     * @default true
     */
    @Input() showIcon: boolean = true;

    /**
     * The url to the image to display in the avatar.
     *
     * When provided the image will be displayed instead of the icon or initials.
     *
     * @example
     *     /avatar-01.png
     */
    @Input() image?: string;

    /**
     * Whether to hide the represented user's name as a tooltip.
     *
     * @default false
     */
    @Input() hideTooltip: boolean = false;

    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * The function to call when the avatar is clicked.
     *
     * @type () => void
     */
    @Output() onClick = new EventEmitter<MouseEvent>();

    get computedInitials(): string | undefined {
        if (this.initials) return this.initials.slice(0, 2).toUpperCase();
        if (this.name) {
            const parts = this.name.split(' ').filter(Boolean);
            return parts
                .map((w) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
        }
        return undefined;
    }

    handleOnClick(event: MouseEvent) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
    }
}
