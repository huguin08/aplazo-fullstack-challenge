import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { LoanDto } from '../entities/LoanDto';

export interface Loan {
  id: string;
  customerId: string;
  amount: number;
  createdAt: string;
  // …otros campos que devuelva el backend, si los hay
}

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly baseUrl = `${environment.apiUrl}/loans`;

  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo préstamo para un cliente.
   * @param data Objeto con customerId y amount.
   * @returns Observable que emite el préstamo recién creado.
   */
  createLoan(data: LoanDto): Observable<Loan> {
    return this.http.post<Loan>(this.baseUrl, data);
  }

  /**
   * Obtiene los detalles de un préstamo existente.
   * @param loanId UUID del préstamo.
   * @returns Observable que emite los datos del préstamo.
   */
  getLoan(loanId: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.baseUrl}/${loanId}`);
  }
}