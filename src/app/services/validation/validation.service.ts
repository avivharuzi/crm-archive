import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class ValidationService {
  constructor() { }

  checkValid(control: FormControl): boolean {
    if (!(control.errors) && !(control.pristine)) {
      return true;
    } else {
      return false;
    }
  }

  checkInvalid(control: FormControl): boolean {
    if ((control.errors) && !(control.pristine)) {
      return true;
    } else {
      return false;
    }
  }

  statusClass(control: FormControl): string {
    if (!(control.errors) && !(control.pristine)) {
      return 'is-valid';
    } else if ((control.errors) && !(control.pristine)) {
      return 'is-invalid';
    }
  }

  dirtyAllInputs(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsDirty({ onlySelf: true });
    });
  }
}
