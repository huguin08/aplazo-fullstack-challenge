import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoanService } from 'src/app/services/loan.service';
import { LoanDto } from 'src/app/entities/LoanDto';

import { UiCardModule } from '../../../../projects/shared-ui/src/lib/ui-card/ui-card.module';
import { UiInputModule } from '../../../../projects/shared-ui/src/lib/ui-input/ui-input.module';
import { UiButtonModule } from '../../../../projects/shared-ui/src/lib/ui-button/ui-button.module';

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
  customerIdControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[0-9a-fA-F-]{36}$/)]
  });

  amountControl = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(1)]
  });

  form = new FormGroup({
    customerId: this.customerIdControl,
    amount: this.amountControl
  });

  loading = false;
  successMessage = '';

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: LoanDto = {
      customerId: this.customerIdControl.value,
      amount: this.amountControl.value
    };

    this.loading = true;
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
