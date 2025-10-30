import {
  booleanAttribute,
  Directive,
  DoCheck,
  effect,
  inject,
  Injector,
  input,
  model,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { noop } from './util';
import { getErrors } from './error-formatter';

export const textInputSizes = ['small', 'medium', 'large'];
export type TextInputSize = (typeof textInputSizes)[number];
export type TextInputType = 'text' | 'number';

@Directive()
export class TextInputControlValueAccessor
  implements ControlValueAccessor, Validator, OnInit, DoCheck
{
  readonly label = input.required<string>();
  readonly value = model<string>('');
  readonly size = input<TextInputSize>('medium');
  readonly type = input<TextInputType>('text');
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readOnly = input(false, { transform: booleanAttribute });
  readonly placeholder = input<string>();
  readonly leading = input<string>();
  readonly trailing = input<string>();
  readonly blur = output<FocusEvent>();
  readonly focusin = output<FocusEvent>();

  readonly errorState = signal<string | SafeHtml>('');
  readonly disabledState = signal(false);
  private ngControl!: NgControl | null;

  private readonly injector = inject(Injector);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    let first = true;
    effect(() => {
      const value = this.value();
      if (first) {
        // This prevents marking the control as dirty before the user has actually modified the value
        first = false;
        return;
      }
      this.onChange(value);
    });
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
  }

  ngDoCheck() {
    if (this.ngControl?.control) {
      this.errorState.set(getErrors(this.ngControl.control, this.sanitizer));
    }
  }

  private onChange: (value: string) => void = noop;
  private onTouched: () => void = noop;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState.set(isDisabled);
  }

  writeValue(obj: any): void {
    if (obj == null) {
      this.value.set('');
    } else {
      this.value.set(String(obj));
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let errors: ValidationErrors | null = null;

    const isRequired = this.required();
    if (isRequired && control.value === '') {
      errors ??= {};
      errors['required'] = true;
    }

    if (this.invalid()) {
      errors ??= {};
      errors['invalid'] = true;
    }

    return errors;
  }

  registerOnValidatorChange(fn: () => void): void {
    // noop
  }

  handleBlur(event: FocusEvent) {
    this.onTouched();
    this.blur.emit(event);
  }

  handleFocusin(event: FocusEvent) {
    this.focusin.emit(event);
  }

  handleInput(event: Event) {
    const out = (event.target as HTMLInputElement).value;
    this.value.set(out);
    this.onChange(out);
  }
}
