import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosService } from '../../../../api/services/productos/productos.service';
import { Producto, Clasificacion } from '../../../productos/interfaces/producto.interface';

interface CategoriaAgrupada {
  nombre: Clasificacion;
  count: number;
}

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent implements OnInit {
  private productosService = inject(ProductosService);
  private router = inject(Router);
  
  categorias: CategoriaAgrupada[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.loading = true;
    this.error = null;
    
    this.productosService.listProductos().subscribe({
      next: (productos) => {
        console.log('Productos recibidos:', productos);
        if (!Array.isArray(productos)) {
          this.error = 'Formato de datos inválido';
          this.loading = false;
          return;
        }
        this.categorias = this.agruparPorClasificacion(productos);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error en categorías:', err);
        this.error = `Error al cargar categorías: ${err.message}`;
        this.loading = false;
      }
    });
  }

  private agruparPorClasificacion(productos: Producto[]): CategoriaAgrupada[] {
    if (!Array.isArray(productos)) {
      return [];
    }

    const mapa = new Map<Clasificacion, number>();
    
    productos.forEach(producto => {
      const count = mapa.get(producto.clasificacion) || 0;
      mapa.set(producto.clasificacion, count + 1);
    });

    const categorias: CategoriaAgrupada[] = [];
    mapa.forEach((count, clasificacion) => {
      categorias.push({
        nombre: clasificacion,
        count: count
      });
    });

    return categorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  irACategoria(clasificacion: Clasificacion): void {
    this.router.navigate(['/productos'], {
      queryParams: {
        clasificacion: clasificacion
      }
    });
  }
}
