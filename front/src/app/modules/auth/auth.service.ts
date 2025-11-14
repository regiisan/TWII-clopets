// src/app/modules/auth/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

// adaptado a lo que devuelve tu /api/usuario/login
export interface AuthUser {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  direccion?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.api_url; // ej: "http://localhost:3000"

  // ===== estado de sesión (observable) =====
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(
    this.readUserFromStorage()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  private readUserFromStorage(): AuthUser | null {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  // ===== API =====

  login(dto: LoginDTO) {
    const payload = {
      email: dto.email,
      contrase_a: dto.password, // como espera tu back
    };

    // tu back devuelve directamente el usuario (sin token)
    return this.http
      .post<AuthUser>(`${this.base}/usuario/login`, payload)
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user);
          localStorage.setItem('auth_user', JSON.stringify(user));
        })
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

  logout() {
    localStorage.removeItem('auth_user');
    this.currentUserSubject.next(null);
  }

  // helpers
  get currentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
