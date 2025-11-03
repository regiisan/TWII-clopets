import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  direccion?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.api_url;

  login(dto: LoginDTO) {
    return this.http.post<{ token: string; user: any }>(`${this.base}/api/auth/login`, dto);
  }

  register(dto: RegisterDTO) {
    return this.http.post<{ id_usuario: number }>(`${this.base}/api/auth/register`, dto);
  }
}
