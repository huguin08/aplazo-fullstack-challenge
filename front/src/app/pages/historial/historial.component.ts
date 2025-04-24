import { Component, OnInit, inject } from '@angular/core';
import { LoanService, LoanResponseDto } from '../../services/loan.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  imports: [CommonModule, RouterModule],
})
export class HistorialComponent implements OnInit {
  private readonly loanService = inject(LoanService);
  private readonly router = inject(Router);

  loans: LoanResponseDto[] = [];
  errorMessage = '';

  ngOnInit(): void {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      this.errorMessage = 'No se encontró información del cliente.';
      return;
    }

    this.loanService.getLoansByCustomerId(customerId).subscribe({
      next: (loans) => {
        this.loans = loans;
      },
      error: () => {
        this.errorMessage = 'No se pudieron obtener los préstamos.';
      }
    });
  }

  goToLoanDetail(loanId: string): void {
    this.router.navigate([`/apz/loan/${loanId}`]);
  }

  getTotalAmount(loan: LoanResponseDto): number {
    return loan.paymentPlan.installments.reduce((acc, i) => acc + i.amount, 0);
  }
}
