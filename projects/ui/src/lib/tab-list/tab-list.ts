import {
    Component,
    EventEmitter,
    Output,
    ViewEncapsulation,
    input,
    computed,
    effect,
    signal,
    inject,
    ElementRef,
    model,
} from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { AsSignal } from '../../types/common';
import { keydownHandler } from '../../utils/keydown-handler';
import { randomString } from '../../utils/random';
import { UIBadge } from '../badge';
import { UIIcon } from '../icon';
import { UITooltipDirective } from '../tooltip/tooltip.directive';

export type TabSize = 'large' | 'medium' | 'small';

export interface TabOption {
    /**
     * The label of the tab. This is the text that will be displayed on the tab.
     *
     * @required
     */
    label: string;
    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The value of the tab sent to valueChange when selected.
     *
     * If not provided, the label will be used as the value.
     */
    value: string;
    /**
     * The icon to display on the left side of the tab.
     *
     * @type BspkIcon
     */
    icon?: BspkIcon;
    /**
     * The icon to display on the left side of the tab when the tab is currently selected.
     *
     * @type BspkIcon
     */
    iconSelected?: BspkIcon;
    /** The badge count to display on the tab */
    badge?: number;
    /** Optional id. If not provided, one is generated. */
    id?: string;
}

// Map Tab size to Badge size
const TAB_BADGE_SIZES: Record<TabSize, 'small' | 'x-small'> = {
    large: 'small',
    medium: 'x-small',
    small: 'x-small',
};

export interface TabListProps<O extends TabOption = TabOption> {
    /**
     * The tabs to display.
     *
     * If **less than 2** items are provided, the component will not render.
     *
     * @example
     *     [
     *         { value: '1', label: 'Option 1' },
     *         { value: '2', label: 'Disabled 2 ', disabled: true },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<TabOption>
     * @required
     */
    options: O[];
    /**
     * The value of the selected tab.
     *
     * @example
     *     1;
     *
     * @required
     */
    value: TabOption['value'];
    /**
     * The size of the tabs.
     *
     * @default medium
     */
    size?: TabSize;
    /**
     * Determines how the tab options use horizontal space.
     *
     * If set to 'fill', options expand to fill the container's width.
     *
     * If set to 'hug', options only take up as much space as the content requires.
     *
     * @default hug
     */
    width?: 'fill' | 'hug';
    /**
     * The label for the tab utility, used for accessibility.
     *
     * @required
     */
    label: string;
    /** The id of the tab utility, used for accessibility. */
    id?: string;
    /**
     * Determines if the labels of the options should be displayed. If icons are not provided for every option this is
     * ignored and labels are shown.
     *
     * @default false
     */
    iconsOnly?: boolean;
}

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * See TabGroup or SegmentedControl for examples.
 */
@Component({
    template: '',
})
export class UITabListUtility<O extends TabOption = TabOption> implements AsSignal<TabListProps<O>> {
    /** The function to call when the tab is clicked. */
    @Output() valueChange = new EventEmitter<string>();

    readonly options = input<TabListProps<O>['options']>([]);
    readonly value = input.required<TabListProps<O>['value']>();
    readonly width = input<TabListProps<O>['width']>('hug');
    readonly label = input.required<TabListProps<O>['label']>();
    readonly id = input<TabListProps<O>['id']>(undefined);
    readonly iconsOnly = input<TabListProps<O>['iconsOnly']>(false);
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly sizeProp = input<TabListProps<O>['size']>('medium', { alias: 'size' });
    readonly size = computed<Exclude<TabListProps<O>['size'], undefined>>(() => this.sizeProp() || 'medium');

    // Internals
    readonly componentId = computed(() => this.id() || `tab-list-${randomString(8)}`);

    readonly optionsWithIds = computed(() => {
        const prefix = this.componentId();
        return (this.options() || []).map((item, index) => ({
            ...item,
            id: item.id ? String(item.id) : `${prefix}-item-${index}`,
        }));
    });

    readonly selectedValue = computed(() => {
        const opts = this.optionsWithIds();
        const v = this.value();
        const found = opts.find((o) => o.value === v);
        return found ? found.value : opts[0]?.value;
    });

    readonly activeId = signal<string | undefined>(undefined);

    readonly focusableId = computed(() => {
        const opts = this.optionsWithIds();
        const active = this.activeId();
        if (active) return active;
        const selected = opts.find((o) => o.value === this.selectedValue());
        return selected ? selected.id : opts[0]?.id;
    });

    readonly shouldHideLabels = computed(() => {
        const iconsOnly = this.iconsOnly() === true;
        const opts = this.optionsWithIds();
        return iconsOnly && opts.every((item) => !!item.icon && !!item.label);
    });

    host = inject<ElementRef<HTMLElement>>(ElementRef);

    constructor() {
        effect(() => {
            // Ensure activeId tracks selected when value changes
            const opts = this.optionsWithIds();
            const selected = opts.find((o) => o.value === this.selectedValue());
            this.activeId.set(selected?.id);
        });
    }

    badgeSizeFor(size: TabSize): 'small' | 'x-small' {
        return TAB_BADGE_SIZES[size];
    }

    currentIcon(item: TabOption & { id: string }): BspkIcon | undefined {
        const isSelected = item.value === this.selectedValue();
        return isSelected ? item.iconSelected || item.icon : item.icon;
    }

    focusActive() {
        const id = this.activeId();
        if (!id || !this.host) return;
        const el = this.host.nativeElement.querySelector<HTMLElement>(`[id="${id}"]`);
        el?.focus();
    }

    onItemClick(item: TabOption & { id: string }) {
        if (item.disabled) return;
        this.activeId.set(item.id);
        if (!item.disabled) this.valueChange.emit(item.value);
    }

    handleKeyDownEvent(event: KeyboardEvent) {
        const opts = this.optionsWithIds().filter((o) => !o.disabled);
        const currentId = this.activeId() || this.focusableId();
        const idx = opts.findIndex((o) => o.id === currentId);

        keydownHandler(
            {
                ArrowRight: () => {
                    const next = idx >= 0 ? opts[(idx + 1) % opts.length] : opts[0];
                    this.activeId.set(next?.id);
                },
                ArrowLeft: () => {
                    const prev = idx > 0 ? opts[(idx - 1 + opts.length) % opts.length] : opts[opts.length - 1];
                    this.activeId.set(prev?.id);
                },
                Enter: () => {
                    const active = this.optionsWithIds().find((o) => o.id === this.activeId());
                    if (active && !active.disabled) this.valueChange.emit(active.value);
                },
                Space: () => {
                    const active = this.optionsWithIds().find((o) => o.id === this.activeId());
                    if (active && !active.disabled) this.valueChange.emit(active.value);
                },
            },
            {
                preventDefault: true,
            },
        )(event);
    }
}

export interface UITabListProps {
    /**
     * The component identifier.
     *
     * Usually
     */
    component: string;
}

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * See TabGroup or SegmentedControl for examples.
 *
 * @example
 *     <!-- Angular example -->
 *     <ui-tab-list
 *     [label]="'Example Tabs'"
 *     [options]="[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *     { value: '3', label: 'Option 3' },
 *     ]"
 *     [value]="selected"
 *     (valueChange)="selected = $event">
 *     </ui-tab-list>
 *
 * @name TabList
 * @phase Utility
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'ul[ui-tab-list]',
    standalone: true,
    imports: [UIBadge, UIIcon, UITooltipDirective],
    template: `@if (optionsWithIds().length > 1) {
        @for (item of optionsWithIds(); track item.id) {
            <li
                [ui-tooltip]="shouldHideLabels() ? { label: item.label, placement: 'top' } : undefined"
                [attr.aria-controls]="componentId()"
                [attr.aria-disabled]="item.disabled ? true : null"
                [attr.aria-selected]="item.value === selectedValue() ? true : null"
                [attr.data-active]="activeId() === item.id ? true : null"
                [attr.data-value]="item.value"
                [attr.id]="item.id"
                (click)="onItemClick(item)"
                role="tab"
                (keydown)="(null)"
                [tabindex]="focusableId() === item.id ? 0 : -1">
                @if (currentIcon(item)) {
                    <span aria-hidden="true" data-icon>
                        <ui-icon [icon]="currentIcon(item)!"></ui-icon>
                    </span>
                }
                @if (!shouldHideLabels()) {
                    <span data-label>{{ item.label }}</span>
                }
                @if (item.badge && !item.disabled) {
                    <ui-badge [count]="item.badge" [size]="badgeSizeFor(size())"></ui-badge>
                }
            </li>
        }
    }`,
    styleUrl: './tab-list.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.data-bspk]': 'component()',
        'data-bspk-utility': 'tab-list',
        '[attr.aria-label]': 'label()',
        '[attr.data-size]': 'size()',
        '[attr.data-width]': 'width()',
        '[attr.id]': 'componentId()',
        tabindex: '-1',
        role: 'tablist',
        '(focusin.capture)': 'focusActive()',
        '(keydown)': 'handleKeyDownEvent($event)',
    },
})
export class UITabList extends UITabListUtility implements AsSignal<UITabListProps> {
    readonly component = model<UITabListProps['component']>('', {
        alias: 'data-bspk',
    });
}
