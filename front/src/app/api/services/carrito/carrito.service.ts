// src/app/api/services/carrito/carrito.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import type { CarritoBackend, CarritoItem, CarritoUI } from '../../interfaces/carrito.interface';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private http = inject(HttpClient);
  private base = environment.api_url;

  private carritoSubject = new BehaviorSubject<CarritoUI | null>(null);
  carrito$ = this.carritoSubject.asObservable();

  loadCarrito(idUsuario: number) {
    return this.http
      .get<CarritoBackend>(`${this.base}/carrito`, {
        params: { id_usuario: idUsuario },
      })
      .pipe(
        map((back) => this.mapToUI(back)),
        tap((ui) => this.carritoSubject.next(ui))
      );
  }

  addProducto(payload: {
    id_usuario: number;
    id_producto: number;
    talle: string;
    cantidad: number;
  }) {
    return this.http.post(`${this.base}/carrito`, payload).pipe(
      tap(() => this.loadCarrito(payload.id_usuario).subscribe())
    );
  }

  actualizarCantidad(idDetalle: number, idUsuario: number, cantidad: number) {
    return this.http
      .put(`${this.base}/carrito/${idDetalle}`, { id_usuario: idUsuario, cantidad })
      .pipe(tap(() => this.loadCarrito(idUsuario).subscribe()));
  }

  eliminarProducto(idDetalle: number, idUsuario: number) {
    return this.http
      .delete(`${this.base}/carrito/${idDetalle}`, {
        params: { id_usuario: idUsuario },
      })
      .pipe(tap(() => this.loadCarrito(idUsuario).subscribe()));
  }

  vaciarCarrito(idUsuario: number) {
    return this.http
      .delete(`${this.base}/carrito`, {
        params: { id_usuario: idUsuario },
      })
      .pipe(tap(() => this.loadCarrito(idUsuario).subscribe()));
  }

  private mapToUI(back: CarritoBackend): CarritoUI {
    const items: CarritoItem[] =
      back?.carrito_producto?.map((cp) => ({
        id_detalle: cp.id_detalle,
        talle: cp.talle,
        cantidad: cp.cantidad,
        precio: cp.precio,
        subtotal: cp.precio * cp.cantidad,
        producto: {
          id_producto: cp.producto_talle.producto.id_producto,
          nombre: cp.producto_talle.producto.nombre,
          imagen_principal: cp.producto_talle.producto.imagen_principal,
        },
      })) ?? [];

    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
    const totalAmount = items.reduce((acc, i) => acc + i.subtotal, 0);

    return {
      id_carrito: back.id_carrito,
      items,
      totalItems,
      totalAmount,
    };
  }
}
