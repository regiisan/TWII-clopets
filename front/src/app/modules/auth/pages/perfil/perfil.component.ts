// src/app/modules/auth/pages/perfil/perfil.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// 👇 SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  user$ = this.auth.currentUser$;
  direccionForm!: FormGroup;

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.direccionForm = this.fb.group({
          direccion: [user.direccion || '', Validators.required],
        });
      }
    });
  }

  actualizarDireccion() {
    if (!this.direccionForm || this.direccionForm.invalid) {
      // opcional: alerta si no completó
      Swal.fire({
        title: 'Dirección requerida',
        text: 'Por favor completá tu dirección antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#4F46E5',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'px-4 py-2 rounded-xl font-semibold',
        },
      });
      return;
    }

    const nuevaDireccion = this.direccionForm.value.direccion;

    this.auth.updateDireccion(nuevaDireccion).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Dirección actualizada!',
          text: 'Guardamos tu dirección correctamente.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl',
          },
        });
      },
      error: (err) => {
        console.error('Error al actualizar dirección', err);
        Swal.fire({
          title: 'Error al actualizar',
          text: 'Ocurrió un problema al guardar tu dirección. Intentá de nuevo en unos minutos.',
          icon: 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#4F46E5',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'px-4 py-2 rounded-xl font-semibold',
          },
        });
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
