import { Directive, DoCheck, inject, Injector, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgControl } from '@angular/forms';
import { getErrors } from './error-formatter';

@Directive()
export abstract class ControlValidator implements DoCheck, OnInit {
  readonly errorState = signal<string | SafeHtml>('');

  private ngControl: NgControl | null = null;
  private readonly injector = inject(Injector);
  private readonly sanitizer = inject(DomSanitizer);

  ngOnInit() {
    // The control needs to be injected in the OnInit lifecycle method, because ngControl depends on the controlValueAccessor being initialized
    this.ngControl = this.injector.get(NgControl, null, { self: true, optional: true });
  }

  ngDoCheck(): void {
    this.updateErrorState();
  }

  updateErrorState(): void {
    const control = this.ngControl?.control;
    if (control) {
      this.errorState.set(getErrors(control, this.sanitizer));
    }
  }
}
