import { Component, input, ViewEncapsulation } from '@angular/core';

import { provideValidator, provideValueAccessor, TextInputControlValueAccessor } from '../../utils';
import { randomString } from '../../utils/randomString';

@Component({
  selector: 'ui-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [provideValueAccessor(Input), provideValidator(Input)],
  host: {
    'data-bspk': 'input',
    '[attr.data-size]': 'size()',
    '[attr.data-invalid]': 'invalid() || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Input extends TextInputControlValueAccessor {
  readonly controlId = input(randomString());
}
