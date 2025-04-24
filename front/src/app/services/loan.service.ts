import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoanRequestDto {
  customerId: string;
  amount: number;
}

export interface LoanResponseDto {
  id: string;
  customerId: string;
  status: string;
  createdAt: string;
  paymentPlan: {
    commissionAmount: number;
    installments: {
      amount: number;
      scheduledPaymentDate: string;
      status: string;
    }[];
  };
}

@Injectable({ providedIn: 'root' })
export class LoanService {
  constructor(private http: HttpClient) {}

  createLoan(data: LoanRequestDto): Observable<LoanResponseDto> {
    const token = localStorage.getItem('authToken') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<LoanResponseDto>('/v1/loans', data, { headers });
  }

  getLoanById(loanId: string): Observable<LoanResponseDto> {
    const token = localStorage.getItem('authToken') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LoanResponseDto>(`/v1/loans/${loanId}`, { headers });
  }

  getLoansByCustomerId(customerId: string): Observable<LoanResponseDto[]> {
    const token = localStorage.getItem('authToken') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<LoanResponseDto[]>(`/v1/loans?customerId=${customerId}`, { headers });
  }
}
