import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoanService } from 'src/app/services/loan.service';
import { LoanDto } from 'src/app/entities/LoanDto';

import { UiCardModule }       from '../../../../projects/shared-ui/src/lib/ui-card/ui-card.module';
import { UiInputModule }      from '../../../../projects/shared-ui/src/lib/ui-input/ui-input.module';
import { UiButtonModule }     from '../../../../projects/shared-ui/src/lib/ui-button/ui-button.module';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiCardModule,
    UiInputModule,
    UiButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Cambiamos null por 0 para que el valor sea siempre number
  form = this.fb.group({
    customerId: ['', [Validators.required, Validators.pattern(/^[0-9a-fA-F-]{36}$/)]],
    amount:     [0,  [Validators.required, Validators.min(1)]]
  });

  loading = false;
  successMessage = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private loanService: LoanService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const dto: LoanDto = {
      customerId: this.form.get('customerId')!.value,
      amount:     this.form.get('amount')!.value  // ahora siempre number
    };

    this.loanService.createLoan(dto).subscribe({
      next: loan => {
        this.loading = false;
        this.successMessage = `Préstamo ${loan.id} creado con éxito.`;
        setTimeout(() => this.router.navigate(['/apz/historial']), 2000);
      },
      error: err => {
        this.loading = false;
        console.error(err);
      }
    });
  }
}