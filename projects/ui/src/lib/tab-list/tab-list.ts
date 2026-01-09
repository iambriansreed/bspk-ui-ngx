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
} from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { randomString } from '../../utils';
import { keydownHandler } from '../../utils/keydown-handler';
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
     * The value of the tab sent to onChange when selected.
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

@Component({
    template: '',
})
export class UITabListUtility {
    /** The function to call when the tab is clicked. */
    @Output() valueChange = new EventEmitter<string>();

    /** The tabs to display. If less than 2 items are provided, the component will not render. */
    readonly options = input<TabOption[]>([]);

    /** The value of the selected tab. */
    readonly value = input<string | undefined>(undefined);

    /** The size of the tabs. @default medium */
    readonly size = input<TabSize>('medium');

    /** Determines how the tab options use horizontal space. @default hug */
    readonly width = input<'fill' | 'hug'>('hug');

    /** The label for the tab utility, used for accessibility. */
    readonly label = input.required<string>();

    /** The id of the tab utility, used for accessibility. */
    readonly id = input<string | undefined>(undefined);

    /**
     * Determines if the labels of the options should be displayed. If icons are not provided for every option this is
     * ignored and labels are shown.
     *
     * @default false
     */
    readonly iconsOnly = input<boolean>(false);

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
export class UITabList extends UITabListUtility {
    readonly component = input<string>('', {
        // eslint-disable-next-line @angular-eslint/no-input-rename
        alias: 'data-bspk',
    });
}
