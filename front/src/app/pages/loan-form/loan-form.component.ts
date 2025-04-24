import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';
import { Router, RouterModule } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';

@Component({
  selector: 'app-loan-form',
  standalone: true,
  templateUrl: './loan-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AplazoButtonComponent]
})
export class LoanFormComponent {

  ngOnInit(): void {
    const storedId = localStorage.getItem('customerId');
    if (storedId) {
      this.loanForm.get('customerId')?.setValue(storedId);
    }
  }
  
  private readonly loanService = inject(LoanService);
  private readonly router = inject(Router);

  readonly loanForm = new FormGroup({
    customerId: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
      )
    ]),
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1)
    ])
  });

  successMessage = '';
  errorMessage = '';

  constructor() {
    const savedId = localStorage.getItem('customerId');
    if (savedId) {
      this.loanForm.get('customerId')?.setValue(savedId);
    }
  }

  submitLoan(): void {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched();
      return;
    }

    const { customerId, amount } = this.loanForm.getRawValue();

    if (!customerId || !amount) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.loanService.createLoan({ customerId, amount }).subscribe({
      next: (loan) => {
        this.successMessage = `Préstamo creado con éxito. ID: ${loan.id}`;
        setTimeout(() => this.router.navigate([`/apz/loan/${loan.id}`]), 1500);
      },
      error: () => {
        this.errorMessage = 'No se pudo crear el préstamo. Intenta nuevamente.';
      }
    });
  }
}
