import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoanService, LoanResponseDto } from '../../services/loan.service';
import { AplazoButtonComponent } from '@apz/shared-ui/button';

@Component({
    standalone: true,
    selector: 'app-loan-detail',
    templateUrl: './loan-detail.component.html',
    imports: [CommonModule, RouterModule, AplazoButtonComponent],
})
export class LoanDetailComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly loanService = inject(LoanService);
    private readonly router = inject(Router);

    loan: LoanResponseDto | null = null;
    errorMessage = '';

    ngOnInit(): void {
        const loanId = this.route.snapshot.paramMap.get('loanId');
        if (!loanId) {
            this.errorMessage = 'ID del préstamo no encontrado.';
            return;
        }

        this.loanService.getLoanById(loanId).subscribe({
            next: (data) => (this.loan = data),
            error: () => {
                this.errorMessage = 'No se pudo obtener el detalle del préstamo.';
            },
        });
    }

    finalizar(): void {
        this.router.navigate(['/apz/home']);
    }
}
