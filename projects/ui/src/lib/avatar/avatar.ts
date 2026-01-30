import { CommonModule } from '@angular/common';
import {
    Component,
    Output,
    EventEmitter,
    ViewEncapsulation,
    input,
    AfterViewInit,
    Renderer2,
    inject,
    EnvironmentInjector,
    ElementRef,
} from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';
import { ColorVariant } from '../../utils/color-variants';
import { IconPerson } from '../icons/person';
import { TooltipUtility } from '../tooltip/tooltip';

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

export type AvatarProps = CommonProps<'disabled'> & {
    /**
     * The name of the person or entity represented by the avatar. This is used for accessibility purposes.
     *
     * @example
     *     Andre Giant
     *
     * @required
     */
    name: string;
    /**
     * The size of the avatar.
     *
     * @default small
     */
    size?: SizeVariant;
    /**
     * The color of the avatar.
     *
     * @default grey
     */
    color?: Exclude<ColorVariant, 'white'>;
    /**
     * Customizable initials to display in the avatar limited to 2 characters.
     *
     * By default, initials are the first letters of the first two words in the name. For a single-word name, only one
     * initial is shown. Names with three or more words, only the first two initials are used.
     *
     * @example
     *     AG;
     */
    initials?: string;
    /**
     * Whether to show the icon in the avatar instead of the initials.
     *
     * If an image is provided, the image will be shown instead of the icon.
     *
     * @default true
     */
    showIcon?: boolean;
    /**
     * The url to the image to display in the avatar.
     *
     * When provided the image will be displayed instead of the icon or initials.
     *
     * @example
     *     /avatar-01.png
     */
    image?: string;
    /**
     * Whether to hide the represented user's name as a tooltip.
     *
     * @default false
     */
    hideTooltip?: boolean;
};

/**
 * An avatar is a visual representation of a user or entity. It can be used to display an initials, icon, or image.
 *
 * @example
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
    imports: [CommonModule, IconPerson],
    template: ` @if (image()) {
            <img [src]="image()" [alt]="name()" aria-hidden="true" />
        } @else if (showIcon()) {
            <span aria-hidden="true" data-icon>
                <icon-person></icon-person>
            </span>
        } @else if (computedInitials) {
            <span aria-hidden="true" data-initials>
                {{ computedInitials }}
            </span>
        }`,
    styleUrls: ['./avatar.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'avatar',
        '[attr.aria-label]': 'name()',
        'aria-roledescription': 'person',
        '[attr.aria-disabled]': 'disabled() || undefined',
        '[attr.tabindex]': '!disabled() && onClick.observed ? 0 : undefined',
        '[attr.role]': "onClick.observed ? 'button' : 'img'",
        '[attr.data-color]': 'color()',
        '[attr.data-size]': 'size()',
        '(click)': 'handleOnClick($event)',
        '(keydown)': 'handleKeyDown($event)',
    },
})
export class UIAvatar implements AfterViewInit, AsSignal<AvatarProps> {
    /** The function to call when the avatar is clicked. */
    @Output() onClick = new EventEmitter<MouseEvent>();

    readonly name = input.required<AvatarProps['name']>();
    readonly size = input<AvatarProps['size']>('small');
    readonly color = input<AvatarProps['color']>('grey');
    readonly initials = input<AvatarProps['initials']>();
    readonly showIcon = input<AvatarProps['showIcon']>(false);
    readonly image = input<AvatarProps['image']>();
    readonly hideTooltip = input<AvatarProps['hideTooltip']>(false);
    readonly disabled = input<AvatarProps['disabled']>(false);

    private renderer = inject(Renderer2);
    private env = inject(EnvironmentInjector);
    private host = inject(ElementRef<HTMLElement>);

    private tooltipUtility: TooltipUtility | undefined;

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

    ngAfterViewInit() {
        if (!this.hideTooltip()) {
            this.tooltipUtility = new TooltipUtility(this.renderer, this.env, {
                label: this.name(),
                reference: this.host.nativeElement,
                placement: 'top',
            });
        }
    }

    onDestroy() {
        this.tooltipUtility?.destroy();
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
