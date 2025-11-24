import { Component, input, Input, ViewEncapsulation } from '@angular/core';
import { UIButton, ButtonSize } from '../button/button';
import { IconCancel } from '../icons/cancel';
import { provideNgxMask } from 'ngx-mask';
import { provideValidator, provideValueAccessor, TextInputControlValueAccessor, randomString } from '../../utils';

@Component({
    selector: 'ui-input',
    imports: [UIButton, IconCancel],
    templateUrl: './input.html',
    styleUrl: './input.scss',
    providers: [provideValueAccessor(UIInput), provideValidator(UIInput), provideNgxMask()],
    host: {
        'data-bspk': 'input',
        '[attr.data-size]': 'size()',
        '[attr.data-invalid]': 'invalid() || null',
        '[attr.data-show-clear-button]': 'showClearButton || null',
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

    clearInput() {
        this.value.set('');
    }

    // this method to ensures the returned value is of type ButtonSize
    getButtonSize(): ButtonSize {
        const validSizes: ButtonSize[] = ['small', 'medium', 'large'];
        const sizeValue = this.size();
        return validSizes.includes(sizeValue as ButtonSize) ? sizeValue as ButtonSize : 'medium';
    }

    readonly controlId = input(randomString());

    public IconClose = IconCancel;
}
