import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterDto } from '../entities/register-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/v1/customers';

  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(this.apiUrl, dto, {
      observe: 'response'
    }).pipe(
      tap(response => {
        const token = response.headers.get('X-Auth-Token');
        if (token) localStorage.setItem('auth_token', token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
