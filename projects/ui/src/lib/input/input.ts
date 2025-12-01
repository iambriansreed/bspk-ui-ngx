import { Component, input, Input, ViewEncapsulation } from '@angular/core';
import { UIButton, ButtonSize } from '../button/button';
import { provideNgxMask } from 'ngx-mask';
import { provideValidator, provideValueAccessor, TextInputControlValueAccessor, randomString } from '../../utils';

@Component({
    selector: 'ui-input',
    imports: [UIButton],
    templateUrl: './input.html',
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
    @Input() showClearButton?: boolean = true;

    getShowClearButton(): boolean | null {
        return (
            !!(
                this.showClearButton !== false &&
                !this.readOnly() &&
                !this.disabled() &&
                this.value()?.length > 0 &&
                document?.activeElement?.id === this.inputId // focused
            ) || null
        );
    }

    clearInput() {
        this.value.set('');
    }

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

    readonly controlId = input(randomString());
}
