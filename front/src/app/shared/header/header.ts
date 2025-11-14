// src/app/shared/header/header.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { CarritoService } from '../../api/services/carrito/carrito.service';
import { CarritoItem } from '../../api/interfaces/carrito.interface'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  // mobile nav
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  close()  { this.open.set(false); }

  // usuario
  userMenuOpen = signal(false);

  // slide carrito
  cartOpen = signal(false);

  private auth = inject(AuthService);
  private router = inject(Router);
  private carritoService = inject(CarritoService);

  currentUser$ = this.auth.currentUser$;
  carrito$ = this.carritoService.carrito$;

  constructor() {
    // cada vez que haya usuario, cargo su carrito
    this.currentUser$.subscribe(user => {
      if (user) {
        this.carritoService.loadCarrito(user.id_usuario).subscribe();
      }
    });
  }

  toggleUserMenu() {
    this.userMenuOpen.update(v => !v);
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }

  toggleCart() {
    this.cartOpen.update(v => !v);
  }

  closeCart() {
    this.cartOpen.set(false);
  }

  logout() {
    this.auth.logout();
    this.userMenuOpen.set(false);
    this.close();
    this.closeCart();
    this.router.navigateByUrl('/auth/login');
  }

  // 👇 AHORA RECIBE EL ITEM COMPLETO
  removeCartItem(item: CarritoItem) {
    const user = this.auth.currentUser;
    if (!user) return;

    // si hay más de 1 unidad → resto 1
    if (item.cantidad > 1) {
      this.carritoService
        .actualizarCantidad(item.id_detalle, user.id_usuario, item.cantidad - 1)
        .subscribe();
    } else {
      // si queda 1 sola → lo elimino
      this.carritoService
        .eliminarProducto(item.id_detalle, user.id_usuario)
        .subscribe();
    }
  }


}
