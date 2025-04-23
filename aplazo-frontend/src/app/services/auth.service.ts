import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

export interface RegisterDto {
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  sex?: string;
  birthPlace?: string;
  curp?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthDate: string;
  // …otros campos que devuelva el backend
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo usuario en el backend.
   * @param data Datos del formulario de registro.
   * @returns Observable con el cliente creado.
   */
  register(data: RegisterDto): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, data);
  }

  /**
   * (Opcional) Cierra la sesión local borrando el token.
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
