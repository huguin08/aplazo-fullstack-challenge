import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
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
    'class': 'register-card'     // <- inyecta la clase en el host <app-register>
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
  
    // 1) Extraemos cada valor asegurándonos de que no sea undefined
    const payload: RegisterDto = {
      firstName:   this.form.get('firstName')!.value!,
      lastName:    this.form.get('lastName')!.value!,
      middleName:  this.form.get('middleName')!.value!,
      birthDate:   this.form.get('birthDate')!.value!,
      sex:         this.form.get('sex')!.value ?? '',
      birthPlace:  this.form.get('birthPlace')!.value ?? '',
      curp:        this.form.get('curp')!.value ?? ''
    };
  
    // 2) Llamamos al servicio con el tipo correcto
    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/apz/home']),
      error: err => console.error(err)
    });
  }
}