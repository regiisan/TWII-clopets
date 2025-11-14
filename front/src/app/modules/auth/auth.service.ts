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
    const payload = {
      email: dto.email,
      contrase_a: dto.password,  
    };
    return this.http.post<{ token: string; user: any }>(
      `${this.base}/usuario/login`,
      payload
    );
  }

  register(dto: RegisterDTO) {
    const payload = {
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      contrase_a: dto.password,  
      direccion: dto.direccion ?? null,
    };
    return this.http.post<{ id_usuario: number }>(
      `${this.base}/usuario/registro`,
      payload
    );
  }
}
