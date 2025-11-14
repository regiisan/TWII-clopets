// src/app/modules/pedidos/pages/checkout-pedido/checkout-pedido.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { AuthService } from '../../../auth/auth.service';
import { PedidosService } from '../../../../api/services/pedidos/pedidos.service';

@Component({
  selector: 'app-checkout-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-pedido.component.html'
})
export class CheckoutPedidoComponent implements OnInit {

  private carritoService = inject(CarritoService);
  private auth = inject(AuthService);
  private router = inject(Router);
  private pedidosService = inject(PedidosService);

  carrito$ = this.carritoService.carrito$;
  currentUser$ = this.auth.currentUser$;

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.carritoService.loadCarrito(user.id_usuario).subscribe();
    }
  }

  finalizarCompra(): void {
    const user = this.auth.currentUser;
    if (!user) return;

    if (!user.direccion) {
      alert('Por favor, completa tu dirección en tu perfil antes de finalizar la compra.');
      return;
    }

    const body = {
      id_usuario: user.id_usuario,
      direccion_envio: user.direccion, // 👈 esto es lo que el back pide
    };

    this.pedidosService.crearPedido(body).subscribe({
      next: (pedido) => {
        // el backend ya vacía el carrito en PedidoService.crearPedido
        alert('✅ Compra finalizada con éxito 🐾');
        this.router.navigate(['/pedidos/historial']);
      },
      error: (err) => {
        console.error('❌ Error al crear pedido', err.error || err);
        alert('Ocurrió un error al registrar el pedido.');
      },
    });
  }
}
