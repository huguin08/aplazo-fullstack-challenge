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
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent, CommonModule, RouterModule ],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/apz/home']);
    }
  }

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    const { firstName, lastName, secondLastName, dateOfBirth } = this.form.getRawValue();
    const formattedDate = new Date(dateOfBirth!).toISOString().split('T')[0];

    this.authService.createCustomer({
      firstName: firstName!,
      lastName: lastName!,
      secondLastName: secondLastName!,
      dateOfBirth: formattedDate!,
    }).subscribe({
      next: ({ token, customer }) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('customerId', customer.id);
        this.router.navigate(['/apz/home']);
      },
      error: (err) => {
        console.error('Error al registrar cliente:', err);
        alert('Hubo un error al registrar el cliente. Intenta nuevamente.');
      }
    });
  }

}