import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface CustomerRequestDto {
  firstName: string;
  lastName: string;
  secondLastName: string;
  dateOfBirth: string; // yyyy-MM-dd
}

export interface CustomerResponseDto {
  id: string;
  createdAt: string;
  creditLineAmount: number;
  availableCreditLineAmount: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  createCustomer(dto: CustomerRequestDto): Observable<{ token: string; customer: CustomerResponseDto }> {
    return this.http.post<CustomerResponseDto>(
      '/v1/customers',
      dto,
      { observe: 'response' }
    ).pipe(
      map((response: HttpResponse<CustomerResponseDto>) => {
        const token = response.headers.get('X-Auth-Token') ?? '';
        return { token, customer: response.body! };
      })
    );
  }
}
