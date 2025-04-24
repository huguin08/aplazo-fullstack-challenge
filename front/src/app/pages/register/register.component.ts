import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, AplazoButtonComponent, AplazoLogoComponent, CommonModule],
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

  readonly dateOfBirth = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      this.validateLegalAge
    ],
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

  sexOptions = ['Masculino', 'Femenino', 'Otro'];
  birthPlaces = [
    'Aguascalientes', 'Baja California', 'Baja California Sur',
    'Campeche', 'Chiapas', 'Chihuahua', 'CDMX', 'Coahuila',
    'Colima', 'Durango', 'Estado de México', 'Guanajuato',
    'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos',
    'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro',
    'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora',
    'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
    'Yucatán', 'Zacatecas'
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  
    const { firstName, lastName, secondLastName, dateOfBirth } = this.form.getRawValue();
  
    this.authService.createCustomer({
      firstName,
      lastName,
      secondLastName,
      dateOfBirth,
    }).subscribe({
      next: ({ token, customer }) => {
        // Guardar token y customerId para futuras llamadas protegidas
        localStorage.setItem('authToken', token);
        localStorage.setItem('customerId', customer.id);
  
        // Redirigir a la creación del préstamo
        this.router.navigate(['/create-loan']);
      },
      error: (err) => {
        console.error('Error al registrar cliente:', err);
        alert('Hubo un error al registrar el cliente. Inténtalo nuevamente.');
      }
    });
  }

  private validateLegalAge(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;
  
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    const isLegal = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  
    return isLegal ? null : { notLegalAge: true };
  }
}
