import { InputSignal, Signal, OutputEmitterRef, ModelSignal } from '@angular/core';

import * as CSS from 'csstype';

type Output<T> = OutputEmitterRef<T>;

type AsInputOrSignal<V> = undefined extends V
    ? InputSignal<V | undefined> | ModelSignal<V | undefined> | Signal<V | undefined>
    : InputSignal<NonNullable<V>> | ModelSignal<NonNullable<V>> | Signal<NonNullable<V>>;

type OutputPayload<V> =
    Extract<NonNullable<V>, (...args: any[]) => any> extends (...args: infer A) => any
        ? A extends []
            ? void
            : A[0]
        : void;

/**
 * A mapped type that transforms the properties of a given type T to Signal or Output types.
 *
 * - For properties starting with "on" followed by a capital letter, they are transformed into Output types.
 * - All other properties are transformed into AsInputOrSignal types.
 */
export type AsSignal<T> = {
    [K in keyof T]: K extends `on${infer R}`
        ? R extends Capitalize<R>
            ? Output<OutputPayload<T[K]>>
            : AsInputOrSignal<T[K]>
        : AsInputOrSignal<T[K]>;
};

export type AlertVariant = 'error' | 'informational' | 'success' | 'warning';

/** Sets a ref to the given element. */
export type SetRef<T> = (instance: T | null) => void;

export type DataProps = Record<`data-${string}`, string>;

export type ButtonSize = 'large' | 'medium' | 'small' | 'x-small';

export interface CallToActionButton {
    /**
     * The label of the call to action button.
     *
     * @required
     */
    label: string;
    /**
     * The callback function for the call to action button.
     *
     * @required
     */
    onClick: () => void;
    /** The size of the call to action button. */
    size?: ButtonSize;
}

export interface CommonPropsLibrary {
    /**
     * Indicates that the element is in an invalid state and displays the error theme.
     *
     * If set to true, an accompanying error message should be provided.
     *
     * @default false
     */
    invalid?: boolean;
    /** The id of the element. If not provided one will be generated. */
    id?: string;
    /**
     * Marks the element as active and displays active state theme.
     *
     * @default false
     */
    active?: boolean;
    /**
     * The size of the element.
     *
     * @default medium
     */
    size?: 'large' | 'medium' | 'small';
    /**
     * Determines if the element is [required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required).
     *
     * @default false
     */
    required?: boolean;
    /**
     * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Determines if the element is [readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly).
     *
     * @default false
     */
    readOnly?: boolean;
    /**
     * The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name) of the control.
     *
     * @required
     */
    name: string;
    /**
     * The value of the control.
     *
     * @required
     */
    optionValue?: string;
    /**
     * The aria-label for the element.
     *
     * This is used to provide an accessible name for the element when a visible label is not present.
     *
     * Ensure this is provided when using the element in isolation to maintain accessibility.
     */
    ariaLabel?: string;
    /** Identifies the parent component. Helps with styling, debugging, and/or testing purposes. */
    owner?: string;
    /**
     * The ARIA role of the element.
     *
     * @type string
     */
    ariaRole?: AriaRole;
    /**
     * Inline styles to apply to the element.
     *
     * Allows for CSS variables to be passed in as well.
     */
    style?: string;
    /** Inline styles object to apply to the element. */
    ngStyle?: CSS.Properties;
    /*
     * The aria-describedby attribute for the control.
     */
    ariaDescribedBy?: string;
    /*
     * The aria-errormessage attribute for the control.
     */
    ariaErrorMessage?: string;
    /** The aria-labelledby attribute for the control. */
    ariaLabelledBy?: string;
    /**
     * Indicates the current "selected" state of the list item when used in a selectable context, such as within a
     * ListItemMenu.
     */
    ariaSelected?: boolean;
    /** The aria-disabled attribute for the element. */
    ariaDisabled?: boolean;
    /** The aria-readonly attribute for the element. */
    ariaReadonly?: boolean;
    /** The htmlFor attribute for the element. */
    htmlFor?: string;
    /** Explicit tabIndex; defaults to 0 when actionable, otherwise -1. */
    tabIndex?: number;
    /** The aria-description attribute for the element. */
    ariaDescription?: string;
    /** The aria-haspopup attribute of the element for accessibility purposes. */
    ariaHaspopup?: string;
    /**
     * The aria-expanded attribute of the element for accessibility purposes.
     *
     * @default null
     */
    ariaExpanded?: boolean | null;
    /**
     * The aria-controls attribute of the element for accessibility purposes.
     *
     * @default null
     */
    ariaControls?: string | null;
    /** Additional CSS classes to apply. */
    class?: string;
}

export type CommonProps<K extends keyof CommonPropsLibrary> = Pick<CommonPropsLibrary, K>;

export type RequiredCommonProps<K extends keyof CommonPropsLibrary> = Required<Pick<CommonPropsLibrary, K>>;

export type FieldControlProps<ValueType = string> = CommonProps<
    | 'ariaDescribedBy'
    | 'ariaErrorMessage'
    | 'ariaLabel'
    | 'ariaLabelledBy'
    | 'disabled'
    | 'id'
    | 'invalid'
    | 'name'
    | 'readOnly'
    | 'required'
> & {
    /**
     * The value of the field control.
     *
     * @required
     */
    value: ValueType | undefined;
};

export type Brand =
    | 'anywhere'
    | 'better-homes-gardens'
    | 'cartus'
    | 'century-21'
    | 'coldwell-banker'
    | 'corcoran'
    | 'denali-boss'
    | 'era'
    | 'sothebys';

// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
export type AriaRole =
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'button'
    | 'cell'
    | 'checkbox'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'feed'
    | 'figure'
    | 'form'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem'
    | (string & {});

export interface UtilityBase<PropsType> {
    props: Signal<PropsType>;
    init(props: Partial<PropsType>): void;
    destroy(): void;
    updateProps(props: Partial<PropsType>): void;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
