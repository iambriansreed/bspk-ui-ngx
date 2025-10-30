import { forwardRef, Provider, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

export const provideValueAccessor = (Component: Type<ControlValueAccessor>): Provider => ({
  multi: true,
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Component),
});

export const provideValidator = (Component: Type<Validator>): Provider => ({
  multi: true,
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Component),
});
