// src/app/modules/auth/pages/perfil/perfil.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
})
export class PerfilComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  user$ = this.auth.currentUser$;
  direccionForm!: FormGroup;

    ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.direccionForm = this.fb.group({
          direccion: [user.direccion || '', Validators.required]
        });
      }
    });
  }

actualizarDireccion() {
  if (this.direccionForm.valid) {
    const nuevaDireccion = this.direccionForm.value.direccion;

    this.auth.updateDireccion(nuevaDireccion).subscribe({
      next: () => {
        alert('Dirección actualizada con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar dirección', err);
      }
    });
  }
}


  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
