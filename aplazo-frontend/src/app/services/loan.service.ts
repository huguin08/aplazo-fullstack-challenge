import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanDto } from '../entities/LoanDto';

export interface Loan {
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

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly apiUrl = 'http://localhost:8080/v1/loans';

  constructor(private http: HttpClient) {}

  createLoan(dto: LoanDto): Observable<Loan> {
    const token = localStorage.getItem('auth_token');
    return this.http.post<Loan>(this.apiUrl, dto, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  getLoan(id: string): Observable<Loan> {
    const token = localStorage.getItem('auth_token');
    return this.http.get<Loan>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}
