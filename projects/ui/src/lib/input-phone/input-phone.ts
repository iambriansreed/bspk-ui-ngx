import { CommonModule } from '@angular/common';
import {
    Component,
    ElementRef,
    ViewEncapsulation,
    computed,
    input,
    model,
    signal,
    viewChild,
    AfterViewInit,
    OnDestroy,
    effect,
} from '@angular/core';
import { getCountryCallingCode, AsYouType } from 'libphonenumber-js';
import { BspkIcon } from '../../types/bspk-icon';
import { AsSignal, FieldControlProps } from '../../types/common';
import { countryCodeData, countryCodes, SupportedCountryCode } from '../../utils/country-codes';
import { uniqueId } from '../../utils/random';
import { scrollLimitStyle, ScrollLimitStyleProps } from '../../utils/scroll-limit-style';
import { sendAriaLiveMessage } from '../../utils/send-aria-live-message';
import { UIButton } from '../button/button';
import { UIFloatingDirective } from '../floating';
import { UIIcon } from '../icon/icon';
import { IconKeyboardArrowDown } from '../icons/keyboard-arrow-down';
import { UIInput } from '../input/input';
import { KeyNavigationUtility } from '../key-navigation';
import { UIListItem } from '../list-item/list-item';
import { UIMenu } from '../menu/menu';
import { UIOutsideClickDirective } from '../outside-click';

const SELECT_OPTIONS = countryCodes.map((code: SupportedCountryCode) => {
    const countryCodeDetails = countryCodeData[code];
    return {
        value: code,
        label: `${countryCodeDetails?.name}`,
        countryCallingCode: getCountryCallingCode(code),
        flagIconName: countryCodeDetails?.flagIconName,
    };
});

export interface CountryCodeOption {
    value: SupportedCountryCode;
    label: string;
    countryCallingCode: string;
    flagIconName: BspkIcon;
}

export interface CountryCodeItem extends CountryCodeOption {
    id: string;
}

export type InputPhoneProps = FieldControlProps<string> &
    ScrollLimitStyleProps & {
        /**
         * The default country code to select when the component is rendered. If not provided, it will attempt to guess
         * based on the user's locale. If the guessed country code is not supported, it will default to 'US'. Based on
         * [ISO](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) 2-digit country codes.
         *
         * @type string
         */
        initialCountryCode?: SupportedCountryCode;
        /**
         * Disables formatting of the phone number input in the UI. values returned by `valueChange` are always
         * unformatted.
         *
         * @type boolean
         */
        disableFormatting?: boolean;
        /**
         * The size of the component
         *
         * @default medium
         */
        size?: 'large' | 'medium' | 'small';
    };

/**
 * An input that allows users to enter text phone numbers and select country codes for the phone number.
 *
 * This is the base element and if used must contain the field label contextually.
 *
 * For a more complete example with field usage, see the InputPhoneField component.
 *
 * @example
 *     <div style="width: 320px">
 *     <ui-field controlId="example-input-phone" helperText="The phone input allows you to enter a phone number with country code." label="Example Input Phone">
 *     <ui-input-phone
 *     [id]="'example-input-phone'"
 *     [name]="'example-name'"
 *     [(value)]="phoneValue"
 *     [initialCountryCode]="'US'"
 *     ariaLabel="Phone Number" />
 *     </ui-field>
 *     </div>
 *
 * @name InputPhone
 * @phase Stable
 */
@Component({
    selector: 'ui-input-phone',
    standalone: true,
    imports: [
        CommonModule,
        UIButton,
        UIInput,
        UIIcon,
        UIListItem,
        UIMenu,
        UIFloatingDirective,
        UIOutsideClickDirective,
    ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: './input-phone.scss',
    host: { 'data-bspk': 'input-phone', tabindex: '-1' },
    template: `
        <ui-input
            [attr.data-bspk-owner]="'input-phone'"
            type="tel"
            [owner]="'input-phone'"
            [size]="size() || 'medium'"
            [invalid]="invalid() || false"
            [id]="safeId()"
            [name]="name()"
            [disabled]="disabled() || false"
            [readOnly]="readOnly() || false"
            [required]="required() || false"
            [placeholder]="''"
            [value]="value()"
            (valueChange)="onValueChange($event)"
            [ariaLabel]="ariaLabel() || 'Phone number input'"
            [ariaDescribedBy]="ariaDescribedBy()"
            [ariaErrorMessage]="ariaErrorMessage()"
            [autoComplete]="'off'"
            [inputMode]="'tel'"
            [showClearButton]="false"
            (keydown)="handleInputKeyDown($event)"
            #inputEl>
            <span data-leading>
                <ui-button
                    [attr.aria-label]="'select country code'"
                    [attr.aria-activedescendant]="open() ? keyNavigation.activeElementId : null"
                    [attr.aria-controls]="open() ? menuId() : null"
                    [attr.aria-owns]="menuId()"
                    [attr.aria-expanded]="open()"
                    aria-haspopup="listbox"
                    [attr.aria-disabled]="disabled() ? true : null"
                    [attr.aria-readonly]="readOnly() ? true : null"
                    [attr.name]="name() + '-country-code'"
                    [disabled]="disabled() || readOnly() || false"
                    [iconOnly]="true"
                    label="Open country code menu"
                    role="combobox"
                    variant="tertiary"
                    (click)="toggleMenu()"
                    (keydown)="handleButtonKeyDown($event)"
                    #countryCodeButton>
                    <ui-icon [icon]="selectedCodeData().flagIconName" [width]="'20px'"></ui-icon>
                    <ui-icon [icon]="IconKeyboardArrowDown" [width]="'20px'"></ui-icon>
                </ui-button>
                <span [attr.aria-hidden]="true" style="cursor: default; margin-right: var(--spacing-sizing-02)"
                    >+{{ callingCode() }}</span
                >
            </span>
        </ui-input>
        @if (open()) {
            <ui-menu
                #floating
                [ui-floating]="{ reference: referenceEl(), refWidth: true }"
                [ui-outside-click]="{
                    callback: closeMenu.bind(this),
                }"
                [id]="menuId()"
                [attr.data-bspk-owner]="'input-phone'"
                [attr.data-bspk]="'menu'"
                role="listbox"
                [ngStyle]="ngMenuStyle()">
                @for (item of menuItems(); track item.id) {
                    <ui-list-item
                        [attr.data-bspk-owner]="'input-phone'"
                        [attr.aria-selected]="countryCode() === item.value"
                        [as]="'div'"
                        [active]="keyNavigation.activeElementId === item.id"
                        [label]="item.label"
                        [tabIndex]="-1"
                        (onClick)="onCountryCodeSelect(item)"
                        [id]="item.id">
                        <ui-icon data-leading [icon]="item.flagIconName" [width]="'24px'"></ui-icon>
                        <span data-trailing>(+{{ item.countryCallingCode }})</span>
                    </ui-list-item>
                }
            </ui-menu>
        }
    `,
})
export class UIInputPhone implements AsSignal<InputPhoneProps>, AfterViewInit, OnDestroy {
    keyNavigation = new KeyNavigationUtility();

    readonly value = model<InputPhoneProps['value']>('');
    readonly name = input.required<InputPhoneProps['name']>();

    readonly size = input<InputPhoneProps['size']>('medium');
    readonly disabled = input<InputPhoneProps['disabled']>(false);
    readonly invalid = input<InputPhoneProps['invalid']>(false);
    readonly readOnly = input<InputPhoneProps['readOnly']>(false);
    readonly required = input<InputPhoneProps['required']>(false);
    readonly ariaLabel = input<InputPhoneProps['ariaLabel']>(undefined);
    readonly ariaDescribedBy = input<InputPhoneProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<InputPhoneProps['ariaErrorMessage']>(undefined);
    readonly id = input<InputPhoneProps['id']>(undefined);
    readonly initialCountryCode = input<InputPhoneProps['initialCountryCode']>(undefined);
    readonly disableFormatting = input<InputPhoneProps['disableFormatting']>(false);
    readonly scrollLimit = input<InputPhoneProps['scrollLimit']>(5);

    readonly reference = viewChild('inputEl', { read: ElementRef });
    readonly containerRef = viewChild('inputEl', { read: ElementRef });

    readonly safeId = computed(() => this.id() || uniqueId('input-phone'));
    readonly menuId = computed(() => `${this.safeId()}-menu`);
    readonly referenceEl = computed(() => this.reference()?.nativeElement);

    readonly open = signal<boolean>(false);
    readonly countryCode = signal<SupportedCountryCode>('US' as SupportedCountryCode);

    readonly menuItems = computed<CountryCodeItem[]>(() =>
        SELECT_OPTIONS.map((option: CountryCodeOption, index: number) => ({
            ...option,
            id: `${this.safeId()}-item-${index}`,
        })),
    );

    readonly selectedCodeData = computed(() => {
        const selectedValue = (this.countryCode() || 'US') as SupportedCountryCode;
        return countryCodeData[selectedValue] ?? countryCodeData.US;
    });

    readonly callingCode = computed(() => {
        return getCountryCallingCode(this.countryCode());
    });

    readonly ngMenuStyle = computed(() => {
        return {
            ...scrollLimitStyle(this.scrollLimit(), SELECT_OPTIONS.length),
        };
    });

    readonly destroy$ = signal<boolean>(false);

    readonly IconKeyboardArrowDown = IconKeyboardArrowDown;
    private readonly previousValue = signal<string>('');

    constructor() {
        effect(() => {
            const code = this.countryCode();

            if (this.disableFormatting()) return;

            const current = this.value();
            if (!current) return;

            const formatter = new AsYouType(code);
            const reformatted = formatter.input(current);

            this.previousValue.set(reformatted);
            this.value.set(reformatted);
        });
    }

    ngAfterViewInit(): void {
        const items = this.menuItems();
        this.keyNavigation.updateProps({ ids: items.map((i: CountryCodeItem) => i.id) });

        this.previousValue.set(this.value() || '');
    }

    ngOnDestroy(): void {
        this.destroy$.set(true);
    }

    toggleMenu(): void {
        if (!this.open()) {
            this.open.set(true);
            const items = this.menuItems();
            if (items.length > 0) {
                this.keyNavigation.setActiveElementId(items[0]?.id || null);
            }
        } else {
            this.open.set(false);
        }
    }

    closeMenu(): void {
        this.open.set(false);
        this.containerRef()?.nativeElement.focus();
    }

    onCountryCodeSelect(item: CountryCodeItem): void {
        this.countryCode.set(item.value);
        sendAriaLiveMessage(`Selected country code ${item.label}`);
        this.closeMenu();
    }

    handleButtonKeyDown(event: KeyboardEvent): void {
        const isOpen = this.open();
        const arrowCallbacks = this.keyNavigation.arrowKeyCallbacks();

        if (event.key === 'ArrowDown') {
            if (!isOpen) {
                this.toggleMenu();
            } else {
                arrowCallbacks['ArrowDown']?.(event);
            }
        } else if (event.key === 'ArrowUp') {
            arrowCallbacks['ArrowUp']?.(event);
        } else if (event.key === ' ' || event.key === 'Enter') {
            this.handleSpaceOrEnter();
            event.preventDefault();
            event.stopPropagation();
        } else if (event.key === 'Escape') {
            this.closeMenu();
            event.preventDefault();
            event.stopPropagation();
        }
    }

    handleInputKeyDown(event: KeyboardEvent): void {
        // ignore non numeric keys
        if (event.key.length === 1 && !/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    onValueChange(newValue?: string): void {
        const formatted = this.formatValueIfNeeded(newValue || '');

        this.previousValue.set(formatted);
        this.value.set(formatted);
    }

    private formatValueIfNeeded(newValue: string): string {
        const prev = this.previousValue();
        const numericChanged = prev.replace(/\D/g, '') !== newValue.replace(/\D/g, '');

        if (this.disableFormatting() || !numericChanged) {
            return newValue;
        }

        const formatter = new AsYouType(this.countryCode());
        return formatter.input(newValue);
    }

    private handleSpaceOrEnter(): void {
        if (!this.open()) {
            this.toggleMenu();
            return;
        }

        const activeId = this.keyNavigation.activeElementId;
        if (activeId) {
            const selectedItem = this.menuItems().find((item: CountryCodeItem) => item.id === activeId);
            if (selectedItem) {
                this.onCountryCodeSelect(selectedItem);
            }
        }
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
