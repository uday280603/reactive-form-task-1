import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from '../../Validation/CustomValidation';
import { EmailValidation } from '../../Validation/EmailValidation';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private _snackbar: SnackbarService) {}

  ngOnInit(): void {
    this.onCreateForm();
    this.onEnableConfirmPasseword();
    this.onPasswordSame();
  }
  onEnableConfirmPasseword() {
    this.c['account'].get('password')?.valueChanges.subscribe((val) => {
      let value = this.c['account'].get('password')?.valid;
      if (value) {
        this.c['account'].get('confirmPassword')?.enable();
      } else {
        this.c['account'].get('confirmPassword')?.disable();
      }
    });
  }

  onPasswordSame() {
    this.c['account']
      .get('confirmPassword')
      ?.valueChanges.subscribe((confirmPassword) => {
        const password = this.c['account'].get('password')?.value;
        const confirmPasswordControl = this.c['account'].get('confirmPassword');

        if (password === confirmPassword) {
          confirmPasswordControl?.setErrors(null);
        } else {
          confirmPasswordControl?.setErrors({
            passwordMismatch: 'Password and confirm password must be the same.',
          });
        }
      });
  }
  onCreateForm() {
    this.userForm = new FormGroup({
      personalInfo: new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ]),
        phone: new FormControl(null, [
          Validators.pattern(CustomRegex.number),
          Validators.required,
          Validators.minLength(10),
        ]),
      }),
      account: new FormGroup({
        email: new FormControl(
          null,
          [Validators.pattern(CustomRegex.email), Validators.required],
          [EmailValidation.isEmailExist],
        ),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(CustomRegex.password),
        ]),
        confirmPassword: new FormControl({ value: null, disabled: true }, [
          Validators.required,
        ]),
      }),
      profile: new FormGroup({
        bio: new FormControl(null, [
          Validators.required,
          Validators.minLength(200),
        ]),
        website: new FormControl(null, [
          Validators.pattern(CustomRegex.website),
          Validators.required,
        ]),
      }),
    });
  }
  

  onAddUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this._snackbar.openSnackbar(`USER REGISTRED SUCCESSFULLY..!`);
      console.log(this.userForm);
      console.log(this.userForm.value);
      this.userForm.reset();
    }
  }

  get c() {
    return this.userForm.controls;
  }
  get personalControl() {
    return this.userForm.get('personalInfo');
  }

  
}
