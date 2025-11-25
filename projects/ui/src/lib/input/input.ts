import { Component, input, ViewEncapsulation, Input as InputAngular } from '@angular/core';

import { provideNgxMask } from 'ngx-mask';
import { provideValidator, provideValueAccessor, TextInputControlValueAccessor, randomString } from '../../utils';

@Component({
    selector: 'ui-input',
    imports: [],
    templateUrl: './input.html',
    styleUrl: './input.scss',
    providers: [provideValueAccessor(UIInput), provideValidator(UIInput), provideNgxMask()],
    host: {
        'data-bspk': 'input',
        '[attr.data-size]': 'size()',
        '[attr.data-invalid]': 'invalid() || null',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIInput extends TextInputControlValueAccessor {
    readonly controlId = input(randomString());

    @InputAngular() showClearButton?: boolean = true;
}
