// src/app/api/services/productos.service.ts  (ajusta la ruta real si difiere)
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../../../modules/productos/interfaces/producto.interface';

export type ProductosQuery = {
  q?: string;
  clasificacion?: string[];          // ej: ['pañuelo','sweater']
  animal?: string[];                 // ej: ['perro','gato']
  precioMin?: number;
  precioMax?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  pageSize?: number;
};

export interface ProductosResponse {
  items: Producto[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);
  private base = environment.api_url; // ej: http://localhost:3000/api
  private baseUrl = environment.api_url.replace('/api', ''); // ej: http://localhost:3000

  private procesarURLsImagenes(producto: Producto): Producto {
    return {
      ...producto,
      imagen_principal: this.construirURLImagen(producto.imagen_principal),
      imagen_secundaria: this.construirURLImagen(producto.imagen_secundaria),
    };
  }

  private construirURLImagen(ruta?: string): string | undefined {
    if (!ruta) return undefined;
    if (ruta.startsWith('http')) return ruta;
    return `${this.baseUrl}/public/${ruta}`;
  }

  /** Versión simple (compatibilidad con lo que ya tenías) */
  listProductos(): Observable<Producto[]> {
    return this.http.get<any>(`${this.base}/producto`).pipe(
      map(data => {
        // Si es un array directamente
        if (Array.isArray(data)) {
          return (data as Producto[]).map(p => this.procesarURLsImagenes(p));
        }
        // Si es un objeto con items (ProductosResponse)
        if (data && data.items && Array.isArray(data.items)) {
          return (data.items as Producto[]).map(p => this.procesarURLsImagenes(p));
        }
        return [];
      })
    );
  }

  /** Versión con filtros/orden/paginación */
  getProductos(query: ProductosQuery): Observable<ProductosResponse> {
    let params = new HttpParams();
    if (query.q) params = params.set('q', query.q);
    if (query.clasificacion?.length) params = params.set('clasificacion', query.clasificacion.join(','));
    if (query.animal?.length)        params = params.set('animal', query.animal.join(','));
    if (query.precioMin != null)     params = params.set('precioMin', String(query.precioMin));
    if (query.precioMax != null)     params = params.set('precioMax', String(query.precioMax));
    if (query.sort)                  params = params.set('sort', query.sort);
    params = params
      .set('page', String(query.page ?? 1))
      .set('pageSize', String(query.pageSize ?? 12));

    return this.http.get<ProductosResponse>(`${this.base}/producto`, { params }).pipe(
      map(response => ({
        ...response,
        items: (response.items as Producto[]).map(p => this.procesarURLsImagenes(p))
      }))
    );
  }

  getProductosHome() {
    return this.http.get<ProductosResponse>(`${environment.api_url}/producto`);
  }

  /** Facetas para armar filtros (animales, clasificaciones, rango precio) */
  getFacetas(): Observable<{ animals: string[]; clasificaciones: string[]; price: { min: number; max: number } }> {
    return this.http.get<{ animals: string[]; clasificaciones: string[]; price: { min: number; max: number } }>(
      `${this.base}/producto/facetas`
    );
  }

  verProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${environment.api_url}/producto/${id}`);
  }

  getTalles(id: number) {
    return this.http.get<any[]>(`${environment.api_url}/productos/${id}/talles`);
  }
}

