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

  ngOnInit(): void {
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.verProducto();
    this.verTalles();

    // me guardo el id del usuario logueado (si lo hay)
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

  // si después querés manejar cantidad con +/- ya está preparado
  cambiarCantidad(delta: number) {
    const nueva = this.cantidad + delta;
    if (nueva < 1) return;
    this.cantidad = nueva;
  }

  agregarAlCarrito() {
    if (!this.producto) return;

    if (!this.userId) {
      alert('Tenés que iniciar sesión para agregar productos al carrito.');
      return;
    }

    if (!this.talleSeleccionado) {
      alert('Por favor seleccioná un talle antes de agregar al carrito.');
      return;
    }

    this.carritoService.addProducto({
      id_usuario: this.userId,
      id_producto: this.producto.id_producto,
      talle: this.talleSeleccionado,
      cantidad: this.cantidad,
    }).subscribe({
      next: () => {
        console.log('Producto agregado al carrito');
        // si querés, acá después metemos un toast lindo de PrimeNG
      },
      error: (err) => {
        console.error('Error al agregar al carrito', err);
        alert('Hubo un problema al agregar el producto al carrito.');
      },
    });
  }

  toggleAccordion(panelName: string): void {
    this.openPanel = this.openPanel === panelName ? null : panelName;
  }
}
