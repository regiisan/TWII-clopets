import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { GalleriaModule } from 'primeng/galleria';

import { ProductosService } from '../../../../api/services/productos/productos.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { AuthService } from '../../../auth/auth.service';
import { Producto } from '../../interfaces/producto.interface';

// SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-productos',
  standalone: true,
  imports: [RouterLink, CardModule, CommonModule, AccordionModule, GalleriaModule],
  templateUrl: './detail-productos.component.html',
  styleUrl: './detail-productos.component.css',
})
export class DetailProductosComponent implements OnInit, OnDestroy {

  // servicios
  private productoService = inject(ProductosService);
  private activatedRouter = inject(ActivatedRoute);
  private carritoService = inject(CarritoService);
  private auth = inject(AuthService);

  // estado
  id: number | null = null;
  producto: Producto | undefined;
  talles: any[] = [];
  talleSeleccionado: string | null = null;
  openPanel: string | null = 'devoluciones';
  cantidad = 1;
  private userId: number | null = null;

  // imágenes
  readonly baseImgUrl = 'http://localhost:3000/public/images/';
  currentImage: string | null = null;

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.verProducto();
    this.verTalles();

    this.auth.currentUser$.subscribe(user => {
      this.userId = user?.id_usuario ?? null;
    });
  }

  ngOnDestroy(): void {}

  verProducto() {
    if (!this.id) return;
    this.productoService.verProducto(this.id).subscribe({
      next: (data) => {
        this.producto = data;
        if (data?.imagen_principal) {
          this.currentImage = this.baseImgUrl + data.imagen_principal;
        }
        console.log('Producto:', data);
      },
    });
  }

  verTalles() {
    if (!this.id) return;
    this.productoService.getTalles(this.id).subscribe({
      next: (data) => {
        this.talles = data;
        console.log('Talles:', data);
      },
    });
  }

  seleccionarTalle(talle: string) {
    this.talleSeleccionado = talle;
  }

  cambiarCantidad(delta: number) {
    const nueva = this.cantidad + delta;
    if (nueva < 1) return;
    this.cantidad = nueva;
  }

  seleccionarImagen(tipo: 'principal' | 'secundaria') {
    if (!this.producto) return;

    const file =
      tipo === 'principal'
        ? this.producto.imagen_principal
        : this.producto.imagen_secundaria || this.producto.imagen_principal;

    if (!file) return;

    this.currentImage = this.baseImgUrl + file;
  }

  agregarAlCarrito() {
    if (!this.producto) return;

    // Usuario NO logueado → alerta + redirección
    if (!this.userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Iniciá sesión',
        text: 'Tenés que iniciar sesión para agregar productos al carrito.',
        confirmButtonColor: '#7C3AED',
        confirmButtonText: 'Ir al login'
      }).then(() => {
        window.location.href = '/auth/login';
      });
      return;
    }

    // No seleccionó talle
    if (!this.talleSeleccionado) {
      Swal.fire({
        icon: 'info',
        title: 'Seleccioná un talle',
        text: 'Por favor seleccioná un talle antes de agregar al carrito.',
        confirmButtonColor: '#7C3AED',
      });
      return;
    }

    // Agregar producto
    this.carritoService.addProducto({
      id_usuario: this.userId,
      id_producto: this.producto.id_producto,
      talle: this.talleSeleccionado,
      cantidad: this.cantidad,
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: `${this.producto?.nombre} fue agregado al carrito.`,
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        console.error('Error al agregar al carrito', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agregar el producto al carrito.',
          confirmButtonColor: '#EF4444',
        });
      },
    });
  }

  toggleAccordion(panelName: string): void {
    this.openPanel = this.openPanel === panelName ? null : panelName;
  }
}
