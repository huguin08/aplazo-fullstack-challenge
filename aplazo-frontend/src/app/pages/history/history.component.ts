import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
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
  styleUrls: ['./history.component.scss'],
  host: {
    'class': 'register-card'
  }
})
export class HistoryComponent {
  // ✅ Aquí está el cambio clave
  loanIdControl = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^[0-9a-fA-F-]{36}$/)]
  });

  form = new FormGroup({
    loanId: this.loanIdControl
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

    const id = this.loanIdControl.value;

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
