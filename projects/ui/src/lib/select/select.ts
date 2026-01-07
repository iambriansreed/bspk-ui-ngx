import {
    Component,
    ElementRef,
    ViewEncapsulation,
    computed,
    input,
    model,
    signal,
    viewChild,
    Renderer2,
    effect,
    OnInit,
} from '@angular/core';
import { AsInputSignal, CommonProps, FieldControlProps } from '../../types/common';
import { Floating } from '../../utils/floating';
import { handleKeyDown } from '../../utils/handleKeyDown';
import { OutsideClick } from '../../utils/outsideClick';
import { IconKeyboardArrowDown } from '../icons/keyboard-arrow-down';
import { UIListItem } from '../list-item/list-item';
import { UIMenu } from '../menu/menu';

/**
 * A field element that allows users to select one option from a list of available choices.
 *
 * For a more complete example with field usage, see the SelectField component.
 *
 * @example
 *     <ui-field controlId="example-select" helperText="Choose one option" label="Select an option">
 *     <ui-select
 *     [id]="'example-select'"
 *     [name]="'example-select'"
 *     [options]="OPTIONS"
 *     [placeholder]="'Select an option'"
 *     [scrollLimit]="5"
 *     [size]="'medium'"
 *     [(value)]="selected">
 *     </ui-select>
 *     </ui-field>
 *
 * @name Select
 * @phase Stable
 */
@Component({
    selector: 'ui-select',
    standalone: true,
    imports: [UIListItem, UIMenu, IconKeyboardArrowDown],
    encapsulation: ViewEncapsulation.None,
    styleUrl: './select.scss',
    template: `
        <input [attr.name]="name() || null" type="hidden" [value]="value() || ''" />
        <button
            type="button"
            [attr.aria-label]="
                (ariaLabel() ? ariaLabel() + ' ' : '') + (selectedItem()?.label || placeholder() || 'Select one')
            "
            [attr.aria-activedescendant]="open() ? activeElementId() : null"
            aria-autocomplete="list"
            [attr.aria-controls]="open() ? menuId() : null"
            [attr.aria-describedby]="ariaDescribedBy() || null"
            [attr.aria-disabled]="disabled() || readOnly() ? true : null"
            [attr.aria-errormessage]="ariaErrorMessage() || null"
            [attr.aria-expanded]="open()"
            aria-haspopup="listbox"
            [attr.aria-readonly]="readOnly() || null"
            [attr.aria-required]="required() || null"
            data-bspk="select"
            [attr.data-invalid]="invalid() || null"
            [attr.data-open]="open() || null"
            [attr.data-size]="size() || 'medium'"
            [attr.id]="id() || null"
            (blur)="onBlur($event)"
            (click)="onControlClick()"
            (keydown)="onKeyDown($event)"
            #reference>
            <ui-list-item
                [owner]="'select'"
                [attr.data-placeholder]="selectedItem() ? null : true"
                [id]="id() ? id() + '-selected-value' : null"
                [label]="selectedItem()?.label || placeholder() || 'Select one'"
                [as]="'div'"
                #selected></ui-list-item>
            <span data-icon>
                <icon-keyboard-arrow-down [width]="'20px'"></icon-keyboard-arrow-down>
            </span>
        </button>
        <ui-menu
            [attr.aria-autocomplete]="null"
            [id]="menuId()"
            (click)="onMenuClick()"
            (focus)="focusReference()"
            [owner]="'select'"
            role="listbox"
            [width]="computedMenuWidth()"
            [style.display]="open() ? 'flex' : 'none'"
            #menu>
            @for (item of items(); track item.id) {
                <ui-list-item
                    [owner]="'select'"
                    [attr.aria-selected]="value() === item.value"
                    [as]="'div'"
                    [active]="activeElementId() === item.id"
                    [label]="item.label"
                    [tabIndex]="-1"
                    (clicked)="onItemClick(item)"></ui-list-item>
            }
        </ui-menu>
    `,
})
export class UISelect implements AsInputSignal<SelectProps>, OnInit {
    readonly value = model<SelectProps['value']>('');
    readonly name = input.required<SelectProps['name']>();

    readonly options = input<SelectOption[]>([]);
    readonly placeholder = input<SelectProps['placeholder']>('Select one');
    readonly size = input<SelectProps['size']>('medium');
    readonly disabled = input<SelectProps['disabled']>(false);
    readonly invalid = input<SelectProps['invalid']>(false);
    readonly id = input<SelectProps['id']>(undefined);
    readonly readOnly = input<SelectProps['readOnly']>(false);
    readonly scrollLimit = input<number | undefined>(undefined);
    readonly required = input<SelectProps['required']>(false);
    readonly ariaLabel = input<SelectProps['ariaLabel']>(undefined);
    readonly menuWidth = input<SelectProps['menuWidth']>(undefined);
    readonly ariaDescribedBy = input<SelectProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<SelectProps['ariaErrorMessage']>(undefined);

    readonly referenceEl = viewChild('reference', { read: ElementRef });
    readonly floatingEl = viewChild('menu', { read: ElementRef });

    // private instance fields are declared after public members

    readonly menuId = computed(() => `${this.id() || 'select'}-menu`);

    readonly items = computed<SelectItem[]>(() => {
        const idBase = this.id() || 'select';
        return (this.options() || []).map((item, index) => ({
            ...item,
            id: `${idBase}-item-${index}`,
            ariaLabel: item.label,
            ariaSelected: this.value() == item.value,
        }));
    });

    readonly availableItems = computed(() => this.items().filter((i) => !i.disabled));

    readonly selectedItem = computed<SelectItem | undefined>(() => this.items().find((i) => i.value === this.value()));

    readonly activeElementId = signal<string | null>(null);
    readonly open = computed<boolean>(() => !!this.activeElementId());

    readonly computedMenuWidth = computed<string | undefined>(() => {
        const provided = this.menuWidth();
        if (provided) return provided as string;
        const ref = this.referenceEl()?.nativeElement;
        return ref ? `${ref.offsetWidth}px` : undefined;
    });

    private floating!: Floating;

    private outsideClick: OutsideClick;

    constructor(private renderer: Renderer2) {
        this.floating = new Floating(renderer, {
            offsetOptions: 4,
        });

        this.outsideClick = new OutsideClick({
            callback: this.closeMenu,
        });

        //
        effect(() => {
            const floatingEl = this.floatingEl()?.nativeElement;
            if (!floatingEl) return;

            const count = this.items().length;
            const limit = Number(this.scrollLimit());

            if (!Number.isNaN(limit) && limit > 0 && limit <= count) {
                this.renderer.setStyle(floatingEl, 'flexDirection', 'column');
                this.renderer.setStyle(floatingEl, 'maxHeight', `calc(var(--list-item-height) * ${limit})`);
                this.renderer.setStyle(floatingEl, 'overflow', 'hidden auto');
            }
        });
    }

    onBlur(event: FocusEvent) {
        const floating = this.floatingEl()?.nativeElement;
        const related = event.relatedTarget as Element | null;
        const targetOutsideOfMenu = related && floating && !floating.contains(related);
        if (targetOutsideOfMenu) this.closeMenu();
    }

    onControlClick() {
        if (this.disabled() || this.readOnly() || !this.items().length) return;
        if (!this.open()) {
            const nextActiveId = this.selectedItem()?.id || this.items()[0]?.id || null;
            this.activeElementId.set(nextActiveId);

            queueMicrotask(async () => await this.floating.compute());
            return;
        }
        this.closeMenu();
    }

    onKeyDown(event: KeyboardEvent) {
        handleKeyDown(
            {
                ArrowDown: () => {
                    if (!this.open()) this.spaceEnter();
                    this.moveActive(1);
                },
                ArrowUp: () => {
                    if (!this.open()) this.spaceEnter();
                    this.moveActive(-1);
                },
                Space: () => this.spaceEnter(),
                Enter: () => this.spaceEnter(),
                'Ctrl+Option+Space': () => this.spaceEnter(),
            },
            { preventDefault: true, stopPropagation: true },
        )(event);
    }

    onMenuClick() {
        // keep focus on control when interacting with menu
        this.focusReference();
    }

    focusReference() {
        const ref = this.referenceEl()?.nativeElement;
        ref?.focus();
    }

    onItemClick(item: SelectItem) {
        if (item.disabled) return;
        this.value.set(item.value);
        this.closeMenu();
    }

    ngOnInit() {
        this.outsideClick.setElements([this.referenceEl()?.nativeElement, this.floatingEl()?.nativeElement]);

        this.floating.setProps({
            reference: this.referenceEl()?.nativeElement,
            floating: this.floatingEl()?.nativeElement,
            refWidth: !this.menuWidth(),
        });
    }

    private spaceEnter() {
        if (!this.open()) {
            this.referenceEl()?.nativeElement?.click();
            return;
        }
        const activeId = this.activeElementId();
        if (activeId) {
            const match = this.items().find((i) => i.id === activeId);
            if (match) this.onItemClick(match);
        }
    }

    private moveActive(delta: number) {
        const ids = this.availableItems().map((i) => i.id);
        const current = this.activeElementId();
        const idx = current ? ids.indexOf(current) : -1;
        const nextIdx = Math.max(0, Math.min(ids.length - 1, idx + delta));
        this.activeElementId.set(ids[nextIdx] ?? null);
    }

    private closeMenu() {
        this.activeElementId.set(null);
    }
}

export type SelectOption = CommonProps<'disabled'> & { label: string; value: string };
export type SelectItem = SelectOption & { id: string; ariaLabel?: string; ariaSelected?: boolean };

export type SelectProps = CommonProps<'size'> &
    FieldControlProps<string> & {
        /**
         * Array of options to display in the select
         *
         * @example
         *     [
         *         { id: '1', label: 'Option 1' },
         *         { id: '2', label: 'Option 2' },
         *         { id: '3', label: 'Option 3' },
         *         { id: '4', label: 'Option 4' },
         *         { id: '5', label: 'Option 5' },
         *         { id: '6', label: 'Option 6' },
         *         { id: '7', label: 'Option 7' },
         *         { id: '8', label: 'Option 8' },
         *         { id: '9', label: 'Option 9' },
         *         { id: '10', label: 'Option 10' },
         *     ];
         *
         * @type Array<SelectOption>
         * @required
         */
        options: SelectOption[];
        /**
         * Placeholder for the select
         *
         * @default Select one
         */
        placeholder?: string;
        /**
         * The width of the menu.
         *
         * If not provided, the menu will match the width of the select control.
         */
        menuWidth?: HTMLElement['style']['width'];
        /**
         * The maximum number of ListItems to show before scrolling is enabled.
         *
         * Used in conjunction with scrollListItemsStyle utility.
         */
        scrollLimit?: number;
    };
