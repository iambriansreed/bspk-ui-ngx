import { CommonModule } from '@angular/common';
import {
    Component,
    computed,
    ElementRef,
    input,
    model,
    viewChild,
    ViewEncapsulation,
    TemplateRef,
    signal,
} from '@angular/core';
import { AsSignal, ButtonSize, CommonProps, FieldControlProps } from '../../types/common';
import { UIButton } from '../button/button';
import { IconCancel } from '../icons/cancel';

export type InputProps = CommonProps<'owner' | 'size'> &
    FieldControlProps & {
        /** The trailing element to display in the field. */
        trailing?: TemplateRef<any> | string;
        /** The leading element to display in the field. */
        leading?: string;
        /** The placeholder of the field. */
        placeholder?: string;
        /**
         * The type of the input.
         *
         * @default text
         */
        type?: 'number' | 'password' | 'tel' | 'text'; /**
         * The inputmode attribute for the input.
         *
         * @default undefined
         */
        inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
        /**
         * Specifies if user agent has any permission to provide automated assistance in filling out form field values
         *
         * @default off
         */
        autoComplete?: 'off' | 'on';
        /**
         * Specifies if the clear button should be shown. This should almost always be true, but can be set to false.
         *
         * @default true
         */
        showClearButton?: boolean;
    };

/**
 * An input that allows users to enter text, numbers or symbols in a singular line. This is a utility element and is not
 * intended to be used directly but rather through the Input, and other components.
 *
 * @example
 *     <ui-input
 *     [value]="inputValue()"
 *     (valueChange)="updateInput($event)"
 *     id="default-input"
 *     name="default-input"
 *     ariaLabel="Input Label "/>
 *
 * @name Input
 * @phase UXReview
 */
@Component({
    selector: 'ui-input',
    imports: [UIButton, CommonModule],
    template: `<ng-content select="[data-leading]">
            @if (leading()) {
                <span data-leading>{{ leading() }}</span>
            }
        </ng-content>

        <input
            data-main-input
            [attr.aria-labelledby]="ariaLabelledBy() || null"
            [attr.aria-describedby]="ariaDescribedBy() || null"
            [attr.ariaErrorMessage]="ariaErrorMessage() || null"
            [attr.aria-label]="ariaLabel() || null"
            [attr.aria-invalid]="invalid() || null"
            [attr.data-invalid]="invalid() || null"
            [disabled]="this.disabled()"
            [attr.id]="id() || null"
            [attr.placeholder]="placeholder() || null"
            [attr.name]="name() || null"
            [attr.autocomplete]="autoComplete() || null"
            [readOnly]="readOnly() || null"
            [required]="required() || null"
            [type]="type()"
            [value]="value() || ''"
            (input)="handleInput($event)"
            (focus)="hasFocus.set(true)"
            (blur)="hasFocus.set(false)"
            #inputEl />
        <ng-content select="[data-trailing]"></ng-content>
        @if (trailing()) {
            @if (trailingValue) {
                <ng-container [ngTemplateOutlet]="trailingValue"></ng-container>
            } @else {
                <span data-trailing>{{ trailing() }}</span>
            }
        }
        @if (displayClearButton()) {
            <ui-button
                data-clear-button
                label="Clear input"
                variant="tertiary"
                [size]="buttonSize()"
                (mousedown)="onClearMouseDown($event)"
                (click)="clearInput()"
                [icon]="IconCancel"
                [iconOnly]="true" />
        }`,
    styleUrl: './input.scss',
    providers: [],
    host: {
        'data-bspk': 'input',
        '[attr.data-size]': 'size()',
        '[attr.data-invalid]': 'invalid() || null',
        '[attr.data-show-clear-button]': '( displayClearButton()) || null',
        '[attr.data-readonly]': 'readOnly() || null',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIInput implements AsSignal<InputProps> {
    public IconCancel = IconCancel;
    readonly hasFocus = signal(false);
    readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

    readonly displayClearButton = computed<boolean>(() => {
        return !!(this.showClearButton() && !this.readOnly() && !this.disabled() && this.value() && this.hasFocus());
    });

    readonly buttonSize = computed<ButtonSize>(() => {
        const validSizes: ButtonSize[] = ['small', 'medium', 'large'];
        const sizeValue = this.size();
        return validSizes.includes(sizeValue as ButtonSize) ? (sizeValue as ButtonSize) : 'medium';
    });

    readonly value = model<InputProps['value']>(undefined);
    readonly name = input.required<InputProps['name']>();

    readonly inputMode = input<InputProps['inputMode']>(undefined);
    readonly showClearButton = input<InputProps['showClearButton']>(true);
    readonly disabled = input<InputProps['disabled']>(false);
    readonly invalid = input<InputProps['invalid']>(false);
    readonly placeholder = input<InputProps['placeholder']>(undefined);
    readonly readOnly = input<InputProps['readOnly']>(false);
    readonly required = input<InputProps['required']>(false);
    readonly type = input<InputProps['type']>('text');
    readonly size = input<InputProps['size']>('medium');
    readonly leading = input<InputProps['leading']>(undefined);
    readonly trailing = input<InputProps['trailing']>(undefined);
    readonly autoComplete = input<InputProps['autoComplete']>(undefined);
    readonly id = input<InputProps['id']>(undefined);
    readonly owner = input<InputProps['owner']>(undefined);
    readonly ariaLabel = input<InputProps['ariaLabel']>(undefined);
    readonly ariaLabelledBy = input<InputProps['ariaLabelledBy']>(undefined);
    readonly ariaDescribedBy = input<InputProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<InputProps['ariaErrorMessage']>(undefined);

    get trailingValue(): TemplateRef<any> | undefined {
        const value = this.trailing();
        return value instanceof TemplateRef ? value : undefined;
    }

    onClearMouseDown(event: MouseEvent) {
        event.preventDefault();
    }

    clearInput() {
        this.value.set('');
        this.inputEl().nativeElement.focus();
    }

    handleInput(event: Event) {
        this.value.set((event.target as HTMLInputElement).value);
    }

    isTemplateRef(value: any): value is TemplateRef<any> {
        return value instanceof TemplateRef;
    }
}
