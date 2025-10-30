import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AbstractControl } from '@angular/forms';

export function getErrors(
  formControl: AbstractControl,
  sanitizer: DomSanitizer
): string | SafeHtml {
  if (!formControl?.invalid) {
    return '';
  }

  if (formControl.dirty && formControl.hasError('matDatepickerParse')) {
    return sanitizer.bypassSecurityTrustHtml('The date is not <strong>valid</strong>');
  }
  if (formControl.dirty && formControl.hasError('matStartDateInvalid')) {
    return sanitizer.bypassSecurityTrustHtml('The start date is not <strong>valid</strong>');
  }
  if (formControl.dirty && formControl.hasError('matEndDateInvalid')) {
    return sanitizer.bypassSecurityTrustHtml('The end date is not <strong>valid</strong>');
  }
  if (formControl.dirty && formControl.hasError('required')) {
    return sanitizer.bypassSecurityTrustHtml('This field is <strong>required</strong>');
  }
  if (formControl.dirty && formControl.hasError('invalidTime')) {
    return 'Enter a valid time';
  }
  if (formControl.touched && formControl.hasError('email')) {
    return sanitizer.bypassSecurityTrustHtml('This field must be a valid <strong>email</strong>');
  }
  if (formControl.touched && formControl.hasError('pattern')) {
    return sanitizer.bypassSecurityTrustHtml('This field is not <strong>valid</strong>');
  }
  if (formControl.hasError('whitespace')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This field cannot contain all <strong>spaces</strong>'
    );
  }
  if (formControl.hasError('textSize')) {
    return sanitizer.bypassSecurityTrustHtml('This field <strong>will not fit</strong>.');
  }
  if (formControl.hasError('minLength') || formControl.hasError('minlength')) {
    return sanitizer.bypassSecurityTrustHtml(
      `At least ${formControl.errors?.['minlength'].requiredLength} characters are <strong>required</strong>`
    );
  }
  if (formControl.hasError('maxlength')) {
    return sanitizer.bypassSecurityTrustHtml(
      `This field exceeds the <strong>maximum</strong> length of ${formControl.errors?.['maxlength'].requiredLength}`
    );
  }
  if (formControl.hasError('max')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This field exceeds the <strong>maximum</strong> value'
    );
  }
  if (formControl.hasError('min')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This field is less than the <strong>minimum</strong> value'
    );
  }
  if (formControl.dirty && formControl.hasError('regex')) {
    return formControl.errors?.['regex'];
  }
  if (formControl.dirty && formControl.hasError('requireHttps')) {
    return sanitizer.bypassSecurityTrustHtml('URL Must start with <strong>https://</strong>');
  }
  if (formControl.dirty && formControl.hasError('url')) {
    return sanitizer.bypassSecurityTrustHtml('This field must be a proper <strong>URL</strong>');
  }
  if (formControl.dirty && formControl.hasError('phone')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This field must be a proper <strong>phone number</strong>'
    );
  }
  if (formControl.dirty && formControl.hasError('wholeNumber')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This field only accepts <strong>whole numbers</strong>'
    );
  }
  if (formControl.dirty && formControl.hasError('title')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This field must be a proper <strong>title or designation</strong>'
    );
  }
  if (formControl.dirty && formControl.hasError('emailExists')) {
    return sanitizer.bypassSecurityTrustHtml('This field must be a unique <strong>email</strong>');
  }
  if (formControl.dirty && formControl.hasError('matDatepickerMax')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This date exceeds the <strong>maximum</strong> allowed date'
    );
  }
  if (formControl.dirty && formControl.hasError('matDatepickerMin')) {
    return sanitizer.bypassSecurityTrustHtml(
      'This date must meet the <strong>minimum</strong> date requirement'
    );
  }
  if (formControl.dirty && formControl.hasError('matDatepickerParse')) {
    return sanitizer.bypassSecurityTrustHtml('Please enter a <strong>valid</strong> date');
  }
  if (formControl.hasError('custom')) {
    const error = formControl.getError('custom');
    return sanitizer.bypassSecurityTrustHtml(error);
  }
  if (formControl.dirty && formControl.hasError('customDirty')) {
    const error = formControl.getError('customDirty');
    return sanitizer.bypassSecurityTrustHtml(error);
  }
  return '';
}
