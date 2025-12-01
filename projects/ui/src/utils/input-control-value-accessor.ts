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
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxMaskDirective, NgxMaskService } from 'ngx-mask';
import { noop } from './util';
import { getErrors } from './error-formatter';
import { Mask } from './mask';

export const textInputSizes = ['small', 'medium', 'large'];
export type TextInputSize = (typeof textInputSizes)[number];
export type TextInputType = 'number' | 'text' | 'password';
export const autoCompleteOptions = ['on', 'off'];
export type AutoCompleteOptions = (typeof autoCompleteOptions)[number];

@Directive()
export class TextInputControlValueAccessor implements ControlValueAccessor, Validator, OnInit, DoCheck {
    readonly label = input.required<string>();
    readonly value = model<string>('');
    readonly size = input<TextInputSize>('medium');
    readonly type = input<TextInputType>('text');
    readonly required = input(false, { transform: booleanAttribute });
    readonly invalid = input(false, { transform: booleanAttribute });
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly readOnly = input(false, { transform: booleanAttribute });
    readonly placeholder = input<string | undefined>(undefined);
    readonly name = input<string | undefined>(undefined);
    readonly autoComplete = input<AutoCompleteOptions>('off');
    readonly ariaLabel = input<string | undefined>(undefined);
    readonly id = input<string | undefined>(undefined);
    readonly leading = input<string>();
    readonly trailing = input<string>();
    readonly mask = input<Mask>();
    readonly blur = output<FocusEvent>();
    readonly focusin = output<FocusEvent>();

    readonly errorState = signal<SafeHtml | string>('');
    readonly disabledState = signal(false);
    private ngControl!: NgControl | null;

    private readonly injector = inject(Injector);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly maskDirective = viewChild(NgxMaskDirective);
    private readonly maskService = inject(NgxMaskService);

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

        effect(() => {
            this.maskDirective()?.writeValue(this.value());
        });
    }

    ngOnInit() {
        this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

        this.maskDirective()?.writeValue(this.value());
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
        const raw = (event.target as HTMLInputElement).value;
        const out = this.mask()?.dropSpecialCharacters ? this.maskService.removeMask(raw) : raw;
        this.value.set(out);
        this.onChange(out);
    }
}
