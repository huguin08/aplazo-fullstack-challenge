import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoanService, Loan } from 'src/app/services/loan.service';
import { UiCardModule }   from '../../../../projects/shared-ui/src/lib/ui-card/ui-card.module';
import { UiInputModule }  from '../../../../projects/shared-ui/src/lib/ui-input/ui-input.module';
import { UiButtonModule } from '../../../../projects/shared-ui/src/lib/ui-button/ui-button.module';

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiCardModule,
    UiInputModule,
    UiButtonModule
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  form = this.fb.group({
    loanId: ['', [Validators.required, Validators.pattern(/^[0-9a-fA-F-]{36}$/)]]
  });

  loading = false;
  loan: Loan | null = null;
  errorMessage = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private loanService: LoanService
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.loan = null;
    this.errorMessage = '';

    const id = this.form.get('loanId')!.value;
    this.loanService.getLoan(id).subscribe({
      next: l => {
        this.loading = false;
        this.loan = l;
      },
      error: err => {
        this.loading = false;
        this.errorMessage = 'No se encontró el préstamo o hubo un error.';
        console.error(err);
      }
    });
  }
}