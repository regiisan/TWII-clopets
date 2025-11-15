// src/app/modules/pedidos/pages/checkout-pedido/checkout-pedido.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { AuthService } from '../../../auth/auth.service';
import { PedidosService } from '../../../../api/services/pedidos/pedidos.service';

// 👇 Importamos SweetAlert2
import Swal from 'sweetalert2';

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

    // ⛔ Dirección faltante → alerta estética
    if (!user.direccion) {
      Swal.fire({
        title: 'Dirección incompleta',
        text: 'Por favor completá tu dirección en tu perfil antes de finalizar la compra.',
        icon: 'warning',
        confirmButtonText: 'Ir a mi perfil',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#9CA3AF',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'px-4 py-2 rounded-xl font-semibold',
          cancelButton: 'px-4 py-2 rounded-xl font-semibold',
        },
      }).then(res => {
        if (res.isConfirmed) {
          this.router.navigate(['auth/perfil']);
        }
      });

      return;
    }

    const body = {
      id_usuario: user.id_usuario,
      direccion_envio: user.direccion,
    };

    this.pedidosService.crearPedido(body).subscribe({
      next: () => {
        // ✔ Compra finalizada
        Swal.fire({
          title: '¡Compra realizada! 🐾',
          text: 'Tu pedido fue registrado con éxito.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl',
          },
        }).then(() => {
          this.router.navigate(['/pedidos/historial']);
        });
      },

      error: (err) => {
        console.error('❌ Error al crear pedido', err);

        Swal.fire({
          title: 'Error al registrar el pedido',
          text: err?.error?.message || 'Ocurrió un problema inesperado.',
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
}
