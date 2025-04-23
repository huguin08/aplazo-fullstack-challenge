import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  NonNullableFormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { UiCardModule }       from '../../../../projects/shared-ui/src/lib/ui-card/ui-card.module';
import { UiInputModule }      from '../../../../projects/shared-ui/src/lib/ui-input/ui-input.module';
import { UiDatePickerModule } from '../../../../projects/shared-ui/src/lib/ui-date-picker/ui-date-picker.module';
import { UiSelectModule }     from '../../../../projects/shared-ui/src/lib/ui-select/ui-select.module';
import { UiButtonModule }     from '../../../../projects/shared-ui/src/lib/ui-button/ui-button.module';

import { RegisterDto } from '../../entities/register-dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiCardModule,
    UiInputModule,
    UiDatePickerModule,
    UiSelectModule,
    UiButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    'class': 'register-card'
  }
})
export class RegisterComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    middleName: ['', Validators.required],
    birthDate: ['', [Validators.required, this.ofLegalAgeValidator]],
    sex:        [''],
    birthPlace: [''],
    curp:       ['']
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Getters para evitar errores de tipos en el template
  get firstNameControl()   { return this.form.get('firstName') as FormControl; }
  get lastNameControl()    { return this.form.get('lastName') as FormControl; }
  get middleNameControl()  { return this.form.get('middleName') as FormControl; }
  get birthDateControl()   { return this.form.get('birthDate') as FormControl; }
  get sexControl()         { return this.form.get('sex') as FormControl; }
  get birthPlaceControl()  { return this.form.get('birthPlace') as FormControl; }
  get curpControl()        { return this.form.get('curp') as FormControl; }

  ofLegalAgeValidator(control: AbstractControl) {
    const dob = new Date(control.value);
    const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return age >= 18 ? null : { tooYoung: true };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: RegisterDto = {
      firstName:   this.firstNameControl.value!,
      lastName:    this.lastNameControl.value!,
      middleName:  this.middleNameControl.value!,
      birthDate:   this.birthDateControl.value!,
      sex:         this.sexControl.value ?? '',
      birthPlace:  this.birthPlaceControl.value ?? '',
      curp:        this.curpControl.value ?? ''
    };

    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/apz/home']),
      error: err => console.error(err)
    });
  }
}
