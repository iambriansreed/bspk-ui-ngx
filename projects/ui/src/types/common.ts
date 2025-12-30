import { InputSignal, Signal } from '@angular/core';

export type AsInputSignal<T> = {
    [K in keyof T]: undefined extends T[K] ? InputSignal<T[K] | undefined> : InputSignal<NonNullable<T[K]>>;
};

export type AsSignal<T> = { [K in keyof T]: Signal<T[K] | undefined> };

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
    'aria-label'?: string;
    /** Identifies the parent component. Helps with styling, debugging, and/or testing purposes. */
    owner?: string;
    /**
     * The ARIA role of the element.
     *
     * @type string
     */
    role?: AriaRole;
    /**
     * Inline styles to apply to the element.
     *
     * Allows for CSS variables to be passed in as well.
     */
    style?: string;
}

export type CommonProps<K extends keyof CommonPropsLibrary> = Pick<CommonPropsLibrary, K>;

export type RequiredCommonProps<K extends keyof CommonPropsLibrary> = Required<Pick<CommonPropsLibrary, K>>;

export type FieldControlProps<ValueType = string> = CommonProps<
    'aria-label' | 'disabled' | 'invalid' | 'name' | 'readOnly' | 'required'
> & {
    /**
     * The value of the field control.
     *
     * @required
     */
    value: ValueType | undefined;
    /**
     * The unique id of the control element.
     *
     * Used to link the control with its label and description for accessibility.
     */
    controlId?: string;
    /** The aria-describedby attribute value that should be applied to the field input element. */
    ariaDescribedBy?: string;
    /** The aria-errormessage attribute value that should be applied to the field input element. */
    ariaErrorMessage?: string;
    /** The aria-labelledby attribute value that should be applied to the field input element. */
    ariaLabelledBy?: string;
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
type AriaRole =
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

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
