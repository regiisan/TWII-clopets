import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProductosService, ProductosResponse } from '../../../../api/services/productos/productos.service';
import { Producto } from '../../interfaces/producto.interface';
import { CardProductosList } from '../../../productos/components/card-productos-list/card-productos-list';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Spinner } from '../../../../shared/spinner/spinner';

@Component({
  selector: 'app-list-productos',
  standalone: true,
  imports: [ReactiveFormsModule, Spinner, Toast, TableModule, CardModule, CommonModule, CardProductosList, ToastModule, ProgressSpinnerModule],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css',
  providers: [MessageService],
})
export class ListProductosComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductosService);
  private messageService = inject(MessageService);

  spinner = true;

  productos: Producto[] = [];
  total = 0;
  loading = false;

  // panel de filtros
  openFilters = false;

  // facetas
  animals: string[] = [];
  clasifs: string[] = [];
  priceMinMax = { min: 0, max: 0 };

  // paginación simple (si luego querés, lo conectamos a botones)
  page = 1;
  pageSize = 12;

  // formulario de filtros
  form = this.fb.group({
    q: [''],
    precioMin: [null as number | null],
    precioMax: [null as number | null],
    animal: [[] as string[]],
    clasificacion: [[] as string[]],
    sort: ['newest' as 'newest' | 'price_asc' | 'price_desc'],
  });

  ngOnInit(): void {
    this.cargarFacetas();
    this.listarProductos();  
    this.form.valueChanges.subscribe(() => {
      this.page = 1;
      this.listarProductos();
    });
  }

  ngOnDestroy(): void {}

  toggleFilters() { this.openFilters = !this.openFilters; }

  cargarFacetas() {
    this.productoService.getFacetas().subscribe({
      next: (f) => {
        this.animals = f.animals || [];
        this.clasifs = f.clasificaciones || [];
        this.priceMinMax = f.price || { min: 0, max: 0 };
      },
      error: () => { /* silencioso */ },
    });
  }

  listarProductos() {
    this.loading = true;
    const v = this.form.value;
    this.productoService.getProductos({
      q: v.q || undefined,
      clasificacion: v.clasificacion || undefined,
      animal: v.animal || undefined,
      precioMin: v.precioMin ?? undefined,
      precioMax: v.precioMax ?? undefined,
      sort: v.sort || 'newest',
      page: this.page,
      pageSize: this.pageSize,
    }).subscribe({
      next: (res: ProductosResponse) => {
        this.productos = res.items;
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error al cargar los productos'});
      } 
    });
  }

  // helpers para los checkboxes
  toggleCheck(list: 'animal' | 'clasificacion', val: string, checked: boolean) {
    const arr = [...(this.form.value[list] || [])];
    const exists = arr.includes(val);
    const next = checked ? (exists ? arr : [...arr, val]) : arr.filter(x => x !== val);
    this.form.patchValue({ [list]: next });
  }

  resetFilters() {
    this.form.reset({ q: '', precioMin: null, precioMax: null, animal: [], clasificacion: [], sort: 'newest' });
    this.page = 1;
    this.listarProductos();
  }
}
