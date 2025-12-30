import { Component, input, ViewEncapsulation } from '@angular/core';
import { provideNgxMask } from 'ngx-mask';
import { ButtonSize } from '../../types/common';
import { provideValidator, provideValueAccessor, TextInputControlValueAccessor, randomString } from '../../utils';
import { UIButton } from '../button/button';
import { IconCancel } from '../icons/cancel';

@Component({
    selector: 'ui-input',
    imports: [UIButton],
    template: `<ng-content select="[data-leading]">
            @if (leading()) {
                <span data-leading>{{ leading() }}</span>
            }
        </ng-content>

        <input
            data-main-input
            [attr.aria-label]="inputAriaLabel"
            [attr.aria-invalid]="inputInvalid"
            [attr.data-invalid]="inputInvalid"
            [disabled]="inputDisabled"
            [id]="inputId"
            [attr.placeholder]="inputPlaceholder"
            [attr.name]="inputName"
            [attr.autocomplete]="inputAutocomplete"
            [readOnly]="inputReadOnly"
            [required]="inputRequired"
            [type]="inputType"
            [value]="inputValue"
            (blur)="handleBlur($event)"
            (input)="handleInput($event)" />

        <ng-content select="[data-trailing]">
            @if (trailing()) {
                <span data-trailing>{{ trailing() }}</span>
            }
        </ng-content>

        @if (getShowClearButton()) {
            <ui-button
                data-clear-button
                label="Clear input"
                variant="tertiary"
                [size]="buttonSize"
                (click)="clearInput()"
                [icon]="IconCancel"
                [iconOnly]="true" />
        }`,
    styleUrl: './input.scss',
    providers: [provideValueAccessor(UIInput), provideValidator(UIInput), provideNgxMask()],
    host: {
        'data-bspk': 'input',
        '[attr.data-size]': 'size()',
        '[attr.data-invalid]': 'invalid() || null',
        '[attr.data-show-clear-button]': 'getShowClearButton()',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIInput extends TextInputControlValueAccessor {
    /**
     * Specifies if the clear button should be shown. This should almost always be true, but can be set to false.
     *
     * @default true
     */
    readonly showClearButton = input<boolean | undefined>(true);

    public IconCancel = IconCancel;

    readonly controlId = input(randomString());

    // this method to ensures the returned value is of type ButtonSize
    get buttonSize(): ButtonSize {
        const validSizes: ButtonSize[] = ['small', 'medium', 'large'];
        const sizeValue = this.size();
        return validSizes.includes(sizeValue as ButtonSize) ? (sizeValue as ButtonSize) : 'medium';
    }

    get inputAriaLabel(): string | undefined {
        return this.ariaLabel() || this.label();
    }

    get inputInvalid(): boolean | null {
        return this.invalid() || null;
    }

    get inputDisabled(): boolean {
        return this.disabled() || this.disabledState();
    }

    get inputId(): string {
        return this.id() || this.controlId();
    }

    get inputPlaceholder(): string | null {
        return this.placeholder() || null;
    }

    get inputName(): string | null {
        return this.name() || null;
    }

    get inputAutocomplete(): string | null {
        return this.autoComplete() || null;
    }

    get inputReadOnly(): boolean | null {
        return this.readOnly() || null;
    }

    get inputRequired(): boolean | null {
        return this.required() || null;
    }

    get inputType(): string {
        return this.type();
    }

    get inputValue(): string | undefined {
        return this.value();
    }

    getShowClearButton(): boolean | null {
        return (
            !!(this.showClearButton() !== false && !this.readOnly() && !this.disabled() && this.value()?.length > 0) ||
            null
        );
    }

    clearInput() {
        this.value.set('');
    }
}
