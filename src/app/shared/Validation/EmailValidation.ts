import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class EmailValidation {
  static isEmailExist(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const value = control.value as string;

    return new Promise<ValidationErrors | null>((resolve) => {
      setTimeout(() => {

        if (value === 'ronak@gmail.com') {
          resolve({
            emailExist: 'Email is already exist...!'
          });
        } else {
          resolve(null);
        }

      }, 2000);
    });
  }
}