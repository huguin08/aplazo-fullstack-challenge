import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent,CommonModule],
})
export class RegisterComponent {
  readonly firstName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly lastName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly secondLastName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly dateOfBirth = new FormControl<Date>(new Date(), {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly sex = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly birthPlace = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly curp = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(18), Validators.maxLength(18)],
  });

  readonly form = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    secondLastName: this.secondLastName,
    dateOfBirth: this.dateOfBirth,
    sex: this.sex,
    birthPlace: this.birthPlace,
    curp: this.curp,
  });

  readonly sexOptions = ['Masculino', 'Femenino', 'Otro'];
  readonly birthPlaces = [
    'Aguascalientes', 'Baja California', 'Baja California Sur',
    'Campeche', 'Chiapas', 'Chihuahua', 'CDMX', 'Coahuila',
    'Colima', 'Durango', 'Estado de México', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos',
    'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
    'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
    'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
    'Yucatán', 'Zacatecas'
  ];

  register(): void {
    console.log(this.form.value);
  }
}