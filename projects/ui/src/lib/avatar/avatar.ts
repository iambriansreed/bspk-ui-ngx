import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, ViewEncapsulation, input } from '@angular/core';
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
 * @phase Dev
 */
@Component({
    selector: 'ui-avatar',
    standalone: true,
    imports: [CommonModule, IconPerson, UITooltipDirective],
    template: `<span
        [ui-tooltip]="{ label: name(), disabled: hideTooltip() }"
        data-bspk="avatar"
        [attr.aria-label]="name()"
        aria-roledescription="person"
        [attr.aria-disabled]="disabled() || undefined"
        [attr.tabindex]="!disabled() && onClick.observed ? 0 : undefined"
        [attr.role]="onClick.observed ? 'button' : 'img'"
        [attr.data-color]="color()"
        [attr.data-size]="size()"
        (click)="handleOnClick($event)"
        (keydown)="handleKeyDown($event)">
        @if (image()) {
            <img [src]="image()" [alt]="name()" aria-hidden="true" />
        } @else if (showIcon()) {
            <span aria-hidden="true" data-icon>
                <icon-person></icon-person>
            </span>
        } @else if (computedInitials) {
            <span aria-hidden="true" data-initials>
                {{ computedInitials }}
            </span>
        }
    </span>`,
    styleUrls: ['./avatar.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        style: `display: contents;`,
    },
})
export class UIAvatar {
    /** The function to call when the avatar is clicked. */
    @Output() onClick = new EventEmitter<MouseEvent>();

    /**
     * The name of the person or entity represented by the avatar. This is used for accessibility purposes.
     *
     * @example
     *     Andre Giant
     *
     * @required
     */
    readonly name = input.required<string>();

    /**
     * The size of the avatar.
     *
     * @default small
     */
    readonly size = input<SizeVariant>('small');

    /**
     * The color of the avatar.
     *
     * @default grey
     */
    readonly color = input('grey');

    /**
     * Customizable initials to display in the avatar limited to 2 characters.
     *
     * By default, initials are the first letters of the first two words in the name. For a single-word name, only one
     * initial is shown. Names with three or more words, only the first two initials are used.
     *
     * @example
     *     AG;
     */
    readonly initials = input<string>();

    /**
     * Whether to show the icon in the avatar instead of the initials.
     *
     * If an image is provided, the image will be shown instead of the icon.
     *
     * @default false
     */
    readonly showIcon = input(false);

    /**
     * The url to the image to display in the avatar.
     *
     * When provided the image will be displayed instead of the icon or initials.
     *
     * @example
     *     /avatar-01.png
     */
    readonly image = input<string | undefined>();

    /**
     * Whether to hide the represented user's name as a tooltip.
     *
     * @default false
     */
    readonly hideTooltip = input(false);

    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    readonly disabled = input(false);

    get computedInitials(): string | undefined {
        const initials = this.initials();
        if (initials) return initials.slice(0, 2).toUpperCase();
        const name = this.name();
        if (name) {
            const parts = name.split(' ').filter(Boolean);
            return parts
                .map((w) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase();
        }
        return undefined;
    }

    handleOnClick(event: MouseEvent) {
        if (!this.disabled()) {
            this.onClick.emit(event);
        }
    }

    handleKeyDown(event: KeyboardEvent) {
        if (!this.disabled() && event.key === 'Enter') {
            this.onClick.emit();
        }
    }
}
