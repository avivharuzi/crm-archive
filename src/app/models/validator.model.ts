import { ValidatorFn, FormControl } from '@angular/forms';

export class Validator {
  private static readonly IS_NUMERIC_FLOAT_REGEX: RegExp = /^[+-]?\d+(\.\d+)?$/;
  private static readonly PHONE_ISRAEL_REGEX: RegExp = /^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/;
  private static readonly WITHOUT_NUMBERS_REGEX: RegExp = /^[^\d]*$/;
  private static readonly IS_EMAIL_REGEX: RegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  static required(name: string): ValidatorFn {
    return formControl => formControl.value === '' || formControl.value === null ? { 'requiredError': `${name} is required` } : null;
  }

  static minLength(len: number): ValidatorFn {
    return (formControl) => {
      if (formControl.value !== null) {
        return formControl.value.toString().length <= len ? { 'minLength': `You need at least ${len} numbers` } : null;
      }
    };
  }

  static maxLength(len: number): ValidatorFn {
    return (formControl) => {
      if (formControl.value !== null) {
        return formControl.value.toString().length >= len ? { 'maxLength': `You need a max ${len} numbers` } : null;
      }
    };
  }

  static isNumericFloat() {
    return (formControl) => {
      if (formControl.value !== null) {
        return !Validator.IS_NUMERIC_FLOAT_REGEX.test(formControl.value) ? { 'isNumericFloatError': `Only numbers are accepted` } : null;
      }
    };
  }

  static matchPassword(password: FormControl): ValidatorFn {
    return formControl => formControl.value !== password.value ? { 'matchPasswordError': 'Passwords are not matched' } : null;
  }

  static phoneIsrael(): ValidatorFn {
    return (formControl) => {
      if (formControl.value !== null) {
        return !Validator.PHONE_ISRAEL_REGEX.test(formControl.value) ? { 'phoneIsraelError': `Phone number is invalid` } : null;
      }
    };
  }

  static withoutNumbers(): ValidatorFn {
    return formControl => !Validator.WITHOUT_NUMBERS_REGEX.test(formControl.value) ?
    { 'withoutNumbersError': `You cant type numbers` } : null;
  }

  static isEmail(): ValidatorFn {
    return (formControl) => {
      if (formControl.value !== null) {
        return !Validator.IS_EMAIL_REGEX.test(formControl.value) ? { 'isEmailError': `Email is invalid` } : null;
      }
    };
  }
}
