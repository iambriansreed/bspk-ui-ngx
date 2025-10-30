import { Component, input, ViewEncapsulation } from '@angular/core';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  provideValidator,
  provideValueAccessor,
  TextInputControlValueAccessor,
  randomString,
} from '../../utils';

@Component({
  selector: 'ui-input',
  imports: [NgxMaskDirective],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [provideValueAccessor(Input), provideValidator(Input), provideNgxMask()],
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
